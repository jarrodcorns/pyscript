package com.shareholder.ssh.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import com.shareholder.ssh.data.SshConnection
import com.shareholder.ssh.ui.vm.EditNoteViewModel
import com.shareholder.ssh.ui.vm.EditNoteViewModelFactory

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun EditNoteScreen(
    nav: NavController,
    noteId: Long?,
    preselectedConnectionId: Long?,
) {
    val ctx = LocalContext.current
    val vm: EditNoteViewModel = viewModel(factory = EditNoteViewModelFactory(ctx, noteId))
    val connections by vm.connections.collectAsState(initial = emptyList())

    var title by remember { mutableStateOf("") }
    var body by remember { mutableStateOf("") }
    var linkedConn by remember { mutableStateOf<SshConnection?>(null) }
    var connDropdownOpen by remember { mutableStateOf(false) }

    LaunchedEffect(noteId) {
        val existing = vm.load()
        existing?.let {
            title = it.title
            body = it.body
        }
    }
    LaunchedEffect(connections, preselectedConnectionId) {
        if (linkedConn == null && preselectedConnectionId != null) {
            linkedConn = connections.find { it.id == preselectedConnectionId }
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(if (noteId == null) "New Note" else "Edit Note") },
                navigationIcon = {
                    IconButton(onClick = { nav.popBackStack() }) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, "Back")
                    }
                },
                actions = {
                    TextButton(onClick = {
                        vm.save(
                            title = title,
                            body = body,
                            connectionId = linkedConn?.id,
                        )
                        nav.popBackStack()
                    }) { Text("Save") }
                },
            )
        },
    ) { padding ->
        Column(
            Modifier
                .fillMaxSize()
                .padding(padding)
                .verticalScroll(rememberScrollState())
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp),
        ) {
            OutlinedTextField(
                value = title,
                onValueChange = { title = it },
                label = { Text("Title") },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true,
            )
            OutlinedTextField(
                value = body,
                onValueChange = { body = it },
                label = { Text("Note") },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(260.dp),
            )

            // Attach to a connection (optional)
            ExposedDropdownMenuBox(
                expanded = connDropdownOpen,
                onExpandedChange = { connDropdownOpen = it },
            ) {
                OutlinedTextField(
                    value = linkedConn?.let { it.label.ifBlank { it.host } } ?: "None",
                    onValueChange = {},
                    readOnly = true,
                    label = { Text("Link to connection (optional)") },
                    trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(connDropdownOpen) },
                    modifier = Modifier
                        .fillMaxWidth()
                        .menuAnchor(MenuAnchorType.PrimaryNotEditable),
                )
                ExposedDropdownMenu(
                    expanded = connDropdownOpen,
                    onDismissRequest = { connDropdownOpen = false },
                ) {
                    DropdownMenuItem(
                        text = { Text("None") },
                        onClick = { linkedConn = null; connDropdownOpen = false },
                    )
                    connections.forEach { conn ->
                        DropdownMenuItem(
                            text = { Text(conn.label.ifBlank { conn.host }) },
                            onClick = { linkedConn = conn; connDropdownOpen = false },
                        )
                    }
                }
            }
        }
    }
}
