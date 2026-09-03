package com.shareholder.ssh.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.Send
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import com.shareholder.ssh.ui.vm.TerminalUiState
import com.shareholder.ssh.ui.vm.TerminalViewModel
import com.shareholder.ssh.ui.vm.TerminalViewModelFactory
import com.shareholder.ssh.ui.vm.displayLabel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TerminalScreen(nav: NavController, connectionId: Long) {
    val ctx = LocalContext.current
    val vm: TerminalViewModel = viewModel(factory = TerminalViewModelFactory(ctx, connectionId))
    val uiState by vm.uiState.collectAsState()
    val output by vm.output.collectAsState()
    var cmd by remember { mutableStateOf("") }
    val vScroll = rememberScrollState()

    LaunchedEffect(output) { vScroll.animateScrollTo(vScroll.maxValue) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(uiState.displayLabel(), style = MaterialTheme.typography.titleSmall) },
                navigationIcon = {
                    IconButton(onClick = { vm.disconnect(); nav.popBackStack() }) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, "Back")
                    }
                },
                actions = {
                    if (uiState is TerminalUiState.Connected) {
                        IconButton(onClick = { vm.send("clear\n") }) {
                            Icon(Icons.Default.ClearAll, "Clear")
                        }
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = Color(0xFF1A1A1A),
                    titleContentColor = Color(0xFF4CAF50),
                    actionIconContentColor = Color(0xFF4CAF50),
                    navigationIconContentColor = Color(0xFF4CAF50),
                ),
            )
        },
        bottomBar = {
            if (uiState is TerminalUiState.Connected) {
                Surface(
                    color = Color(0xFF1A1A1A),
                    tonalElevation = 4.dp,
                ) {
                    Row(
                        Modifier
                            .fillMaxWidth()
                            .navigationBarsPadding()
                            .padding(horizontal = 8.dp, vertical = 4.dp),
                        verticalAlignment = Alignment.CenterVertically,
                    ) {
                        TextField(
                            value = cmd,
                            onValueChange = { cmd = it },
                            modifier = Modifier.weight(1f),
                            placeholder = { Text("command...", color = Color(0xFF616161)) },
                            singleLine = true,
                            colors = TextFieldDefaults.colors(
                                focusedContainerColor = Color(0xFF212121),
                                unfocusedContainerColor = Color(0xFF212121),
                                focusedTextColor = Color(0xFF80FF80),
                                unfocusedTextColor = Color(0xFF80FF80),
                                cursorColor = Color(0xFF80FF80),
                                focusedIndicatorColor = Color.Transparent,
                                unfocusedIndicatorColor = Color.Transparent,
                            ),
                            textStyle = androidx.compose.ui.text.TextStyle(fontFamily = FontFamily.Monospace),
                            keyboardOptions = KeyboardOptions(imeAction = ImeAction.Send),
                            keyboardActions = KeyboardActions(onSend = {
                                vm.send("$cmd\n"); cmd = ""
                            }),
                        )
                        IconButton(onClick = { vm.send("$cmd\n"); cmd = "" }) {
                            Icon(
                                Icons.AutoMirrored.Filled.Send, "Send",
                                tint = Color(0xFF4CAF50),
                            )
                        }
                    }
                }
            }
        },
    ) { padding ->
        Box(
            Modifier
                .fillMaxSize()
                .background(Color(0xFF0D0D0D))
                .padding(padding),
        ) {
            when (val state = uiState) {
                is TerminalUiState.Connecting -> {
                    Column(
                        Modifier.align(Alignment.Center),
                        horizontalAlignment = Alignment.CenterHorizontally,
                    ) {
                        CircularProgressIndicator(color = Color(0xFF4CAF50))
                        Spacer(Modifier.height(12.dp))
                        Text("Connecting to ${state.label}…", color = Color(0xFF80FF80))
                    }
                }
                is TerminalUiState.Error -> {
                    Column(
                        Modifier
                            .align(Alignment.Center)
                            .padding(24.dp),
                        horizontalAlignment = Alignment.CenterHorizontally,
                    ) {
                        Icon(
                            Icons.Default.ErrorOutline,
                            null,
                            tint = Color(0xFFEF5350),
                            modifier = Modifier.size(48.dp),
                        )
                        Spacer(Modifier.height(12.dp))
                        Text(state.message, color = Color(0xFFEF5350))
                        Spacer(Modifier.height(16.dp))
                        Button(onClick = { nav.popBackStack() }) { Text("Back") }
                    }
                }
                is TerminalUiState.Connected -> {
                    SelectionContainer {
                        Text(
                            text = output,
                            modifier = Modifier
                                .fillMaxSize()
                                .verticalScroll(vScroll)
                                .horizontalScroll(rememberScrollState())
                                .padding(8.dp),
                            fontFamily = FontFamily.Monospace,
                            fontSize = 12.sp,
                            color = Color(0xFF80FF80),
                            lineHeight = 16.sp,
                        )
                    }
                }
                else -> Unit
            }
        }
    }
}

@Composable
private fun SelectionContainer(content: @Composable () -> Unit) {
    androidx.compose.foundation.text.selection.SelectionContainer(content = content)
}
