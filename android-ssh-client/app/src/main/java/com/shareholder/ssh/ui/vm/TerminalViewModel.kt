package com.shareholder.ssh.ui.vm

import android.content.Context
import androidx.lifecycle.*
import com.shareholder.ssh.ShareholderSshApp
import com.shareholder.ssh.ssh.SshClient
import com.shareholder.ssh.ssh.SshResult
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import java.io.OutputStream

sealed class TerminalUiState {
    data class Connecting(val label: String) : TerminalUiState()
    data class Connected(val label: String) : TerminalUiState()
    data class Error(val label: String, val message: String) : TerminalUiState()
    object Idle : TerminalUiState()
}

fun TerminalUiState.displayLabel(): String = when (this) {
    is TerminalUiState.Connecting -> this.label
    is TerminalUiState.Connected -> this.label
    is TerminalUiState.Error -> this.label
    else -> ""
}

class TerminalViewModel(ctx: Context, private val connectionId: Long) : ViewModel() {

    private val dao = (ctx.applicationContext as ShareholderSshApp).db.connectionDao()
    private val _uiState = MutableStateFlow<TerminalUiState>(TerminalUiState.Idle)
    val uiState: StateFlow<TerminalUiState> = _uiState.asStateFlow()

    private val _output = MutableStateFlow("")
    val output: StateFlow<String> = _output.asStateFlow()

    private var sshResult: SshResult? = null
    private var outputStream: OutputStream? = null

    init {
        connect()
    }

    private fun connect() {
        viewModelScope.launch {
            val conn = dao.byId(connectionId) ?: run {
                _uiState.value = TerminalUiState.Error("", "Connection not found")
                return@launch
            }
            val label = conn.label.ifBlank { "${conn.username}@${conn.host}" }
            _uiState.value = TerminalUiState.Connecting(label)
            try {
                val result = SshClient.connect(
                    host = conn.host,
                    port = conn.port,
                    username = conn.username,
                    password = conn.password,
                    privateKey = conn.privateKey,
                )
                sshResult = result
                outputStream = result.output
                _uiState.value = TerminalUiState.Connected(label)
                readLoop(result)
            } catch (e: Exception) {
                _uiState.value = TerminalUiState.Error(label, e.message ?: "Connection failed")
            }
        }
    }

    private fun readLoop(result: SshResult) {
        viewModelScope.launch(Dispatchers.IO) {
            val buf = ByteArray(4096)
            try {
                while (result.channel.isConnected) {
                    val available = result.input.available()
                    if (available > 0) {
                        val n = result.input.read(buf, 0, minOf(available, buf.size))
                        if (n > 0) {
                            val chunk = String(buf, 0, n, Charsets.UTF_8)
                            _output.update { (it + chunk).takeLast(50_000) }
                        }
                    } else {
                        delay(50)
                    }
                }
            } catch (_: Exception) {}
        }
    }

    fun send(text: String) {
        viewModelScope.launch(Dispatchers.IO) {
            try {
                outputStream?.write(text.toByteArray())
                outputStream?.flush()
            } catch (_: Exception) {}
        }
    }

    fun disconnect() {
        sshResult?.channel?.disconnect()
        sshResult?.session?.disconnect()
        sshResult = null
    }

    override fun onCleared() {
        super.onCleared()
        disconnect()
    }
}

class TerminalViewModelFactory(private val ctx: Context, private val id: Long) : ViewModelProvider.Factory {
    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>) = TerminalViewModel(ctx, id) as T
}
