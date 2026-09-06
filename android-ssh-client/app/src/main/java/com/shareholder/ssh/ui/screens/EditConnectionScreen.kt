package com.shareholder.ssh.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.input.*
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import com.shareholder.ssh.ui.vm.EditConnectionViewModel
import com.shareholder.ssh.ui.vm.EditConnectionViewModelFactory

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun EditConnectionScreen(nav: NavController, connectionId: Long?) {
    val ctx = LocalContext.current
    val vm: EditConnectionViewModel = viewModel(
        factory = EditConnectionViewModelFactory(ctx, connectionId),
    )

    var label by remember { mutableStateOf("") }
    var host by remember { mutableStateOf("") }
    var port by remember { mutableStateOf("22") }
    var username by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var privateKey by remember { mutableStateOf("") }
    var showPassword by remember { mutableStateOf(false) }
    var showKey by remember { mutableStateOf(false) }

    LaunchedEffect(connectionId) {
        val existing = vm.load()
        existing?.let {
            label = it.label
            host = it.host
            port = it.port.toString()
            username = it.username
            password = it.password
            privateKey = it.privateKey
        }
    }

    val isValid = host.isNotBlank() && username.isNotBlank()

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(if (connectionId == null) "New Connection" else "Edit Connection") },
                navigationIcon = {
                    IconButton(onClick = { nav.popBackStack() }) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, "Back")
                    }
                },
                actions = {
                    TextButton(
                        onClick = {
                            vm.save(
                                label = label,
                                host = host,
                                port = port.toIntOrNull() ?: 22,
                                username = username,
                                password = password,
                                privateKey = privateKey,
                            )
                            nav.popBackStack()
                        },
                        enabled = isValid,
                    ) { Text("Save") }
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
                value = label,
                onValueChange = { label = it },
                label = { Text("Label (optional)") },
                modifier = Modifier.fillMaxWidth(),
                leadingIcon = { Icon(Icons.Default.Label, null) },
                singleLine = true,
            )
            OutlinedTextField(
                value = host,
                onValueChange = { host = it },
                label = { Text("Hostname / IP *") },
                modifier = Modifier.fillMaxWidth(),
                leadingIcon = { Icon(Icons.Default.Dns, null) },
                singleLine = true,
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Uri),
            )
            OutlinedTextField(
                value = port,
                onValueChange = { port = it.filter { c -> c.isDigit() } },
                label = { Text("Port") },
                modifier = Modifier.fillMaxWidth(),
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                singleLine = true,
            )
            OutlinedTextField(
                value = username,
                onValueChange = { username = it },
                label = { Text("Username *") },
                modifier = Modifier.fillMaxWidth(),
                leadingIcon = { Icon(Icons.Default.Person, null) },
                singleLine = true,
            )
            OutlinedTextField(
                value = password,
                onValueChange = { password = it },
                label = { Text("Password") },
                modifier = Modifier.fillMaxWidth(),
                leadingIcon = { Icon(Icons.Default.Lock, null) },
                trailingIcon = {
                    IconButton(onClick = { showPassword = !showPassword }) {
                        Icon(
                            if (showPassword) Icons.Default.VisibilityOff else Icons.Default.Visibility,
                            if (showPassword) "Hide password" else "Show password",
                        )
                    }
                },
                visualTransformation = if (showPassword) VisualTransformation.None else PasswordVisualTransformation(),
                singleLine = true,
            )
            Text(
                "— or use a private key —",
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.5f),
                modifier = Modifier.padding(top = 4.dp),
            )
            OutlinedTextField(
                value = privateKey,
                onValueChange = { privateKey = it },
                label = { Text("PEM private key (optional)") },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(160.dp),
                leadingIcon = { Icon(Icons.Default.Key, null) },
                visualTransformation = if (showKey) VisualTransformation.None else PasswordVisualTransformation(),
                trailingIcon = {
                    IconButton(onClick = { showKey = !showKey }) {
                        Icon(
                            if (showKey) Icons.Default.VisibilityOff else Icons.Default.Visibility,
                            null,
                        )
                    }
                },
            )
        }
    }
}
