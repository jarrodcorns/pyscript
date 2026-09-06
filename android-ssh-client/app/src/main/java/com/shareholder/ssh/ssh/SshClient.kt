package com.shareholder.ssh.ssh

import com.jcraft.jsch.ChannelShell
import com.jcraft.jsch.JSch
import com.jcraft.jsch.Session
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.InputStream
import java.io.OutputStream

data class SshResult(val session: Session, val channel: ChannelShell, val input: InputStream, val output: OutputStream)

object SshClient {

    @Throws(Exception::class)
    suspend fun connect(
        host: String,
        port: Int,
        username: String,
        password: String,
        privateKey: String = "",
    ): SshResult = withContext(Dispatchers.IO) {
        val jsch = JSch()
        if (privateKey.isNotBlank()) {
            jsch.addIdentity("key", privateKey.toByteArray(), null, null)
        }
        val session: Session = jsch.getSession(username, host, port)
        if (password.isNotBlank()) session.setPassword(password)
        session.setConfig("StrictHostKeyChecking", "no")
        session.connect(15_000)

        val channel = session.openChannel("shell") as ChannelShell
        channel.setPtyType("xterm-256color")
        val input = channel.inputStream
        val output = channel.outputStream
        channel.connect(10_000)
        SshResult(session, channel, input, output)
    }
}
