package com.shareholder.ssh.ui.screens

import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.combinedClickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import com.shareholder.ssh.data.SshConnection
import com.shareholder.ssh.ui.vm.ConnectionsViewModel
import com.shareholder.ssh.ui.vm.ConnectionsViewModelFactory

@OptIn(ExperimentalMaterial3Api::class, ExperimentalFoundationApi::class)
@Composable
fun ConnectionsScreen(nav: NavController) {
    val ctx = LocalContext.current
    val vm: ConnectionsViewModel = viewModel(factory = ConnectionsViewModelFactory(ctx))
    val connections by vm.connections.collectAsStateWithLifecycle(initialValue = emptyList())
    var deleteTarget by remember { mutableStateOf<SshConnection?>(null) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Shareholder SSH") },
                actions = {
                    IconButton(onClick = { nav.navigate("notes") }) {
                        Icon(Icons.Default.Description, "Notes")
                    }
                },
            )
        },
        floatingActionButton = {
            FloatingActionButton(onClick = { nav.navigate("edit_connection") }) {
                Icon(Icons.Default.Add, "Add connection")
            }
        },
    ) { padding ->
        if (connections.isEmpty()) {
            Box(
                Modifier
                    .fillMaxSize()
                    .padding(padding),
                contentAlignment = Alignment.Center,
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Icon(
                        Icons.Default.Terminal,
                        contentDescription = null,
                        modifier = Modifier.size(64.dp),
                        tint = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.3f),
                    )
                    Spacer(Modifier.height(12.dp))
                    Text(
                        "No saved connections yet",
                        style = MaterialTheme.typography.bodyLarge,
                        color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.5f),
                    )
                    Text(
                        "Tap + to add one",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.35f),
                    )
                }
            }
        } else {
            LazyColumn(
                contentPadding = PaddingValues(
                    start = 16.dp,
                    end = 16.dp,
                    top = padding.calculateTopPadding() + 8.dp,
                    bottom = padding.calculateBottomPadding() + 72.dp,
                ),
                verticalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                items(connections, key = { it.id }) { conn ->
                    ConnectionCard(
                        conn = conn,
                        onConnect = {
                            vm.touch(conn)
                            nav.navigate("terminal/${conn.id}")
                        },
                        onEdit = { nav.navigate("edit_connection?id=${conn.id}") },
                        onNote = { nav.navigate("edit_note?connId=${conn.id}") },
                        onDelete = { deleteTarget = conn },
                        modifier = Modifier.animateItem(),
                    )
                }
            }
        }
    }

    deleteTarget?.let { conn ->
        AlertDialog(
            onDismissRequest = { deleteTarget = null },
            title = { Text("Delete connection?") },
            text = { Text("\"${conn.label.ifBlank { conn.host }}\" will be removed permanently.") },
            confirmButton = {
                TextButton(onClick = {
                    vm.delete(conn)
                    deleteTarget = null
                }) { Text("Delete", color = MaterialTheme.colorScheme.error) }
            },
            dismissButton = {
                TextButton(onClick = { deleteTarget = null }) { Text("Cancel") }
            },
        )
    }
}

@OptIn(ExperimentalFoundationApi::class)
@Composable
private fun ConnectionCard(
    conn: SshConnection,
    onConnect: () -> Unit,
    onEdit: () -> Unit,
    onNote: () -> Unit,
    onDelete: () -> Unit,
    modifier: Modifier = Modifier,
) {
    var menuOpen by remember { mutableStateOf(false) }

    Card(
        modifier = modifier
            .fillMaxWidth()
            .combinedClickable(
                onClick = onConnect,
                onLongClick = { menuOpen = true },
            ),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
    ) {
        Row(
            Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 12.dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Icon(
                Icons.Default.Terminal,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.primary,
                modifier = Modifier.size(36.dp),
            )
            Spacer(Modifier.width(12.dp))
            Column(Modifier.weight(1f)) {
                Text(
                    conn.label.ifBlank { conn.host },
                    style = MaterialTheme.typography.titleMedium,
                )
                Text(
                    "${conn.username}@${conn.host}:${conn.port}",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f),
                )
            }
            IconButton(onClick = { menuOpen = true }) {
                Icon(Icons.Default.MoreVert, "Options")
            }
            DropdownMenu(expanded = menuOpen, onDismissRequest = { menuOpen = false }) {
                DropdownMenuItem(
                    text = { Text("Connect") },
                    leadingIcon = { Icon(Icons.Default.PlayArrow, null) },
                    onClick = { menuOpen = false; onConnect() },
                )
                DropdownMenuItem(
                    text = { Text("Edit") },
                    leadingIcon = { Icon(Icons.Default.Edit, null) },
                    onClick = { menuOpen = false; onEdit() },
                )
                DropdownMenuItem(
                    text = { Text("Add note") },
                    leadingIcon = { Icon(Icons.Default.NoteAdd, null) },
                    onClick = { menuOpen = false; onNote() },
                )
                HorizontalDivider()
                DropdownMenuItem(
                    text = { Text("Delete", color = MaterialTheme.colorScheme.error) },
                    leadingIcon = { Icon(Icons.Default.Delete, null, tint = MaterialTheme.colorScheme.error) },
                    onClick = { menuOpen = false; onDelete() },
                )
            }
        }
    }
}
