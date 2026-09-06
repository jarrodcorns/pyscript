package com.shareholder.ssh.ui.vm

import android.content.Context
import androidx.lifecycle.*
import com.shareholder.ssh.ShareholderSshApp
import com.shareholder.ssh.data.SshConnection
import kotlinx.coroutines.runBlocking

class EditConnectionViewModel(ctx: Context, private val id: Long?) : ViewModel() {
    private val dao = (ctx.applicationContext as ShareholderSshApp).db.connectionDao()

    suspend fun load(): SshConnection? = id?.let { dao.byId(it) }

    fun save(label: String, host: String, port: Int, username: String, password: String, privateKey: String) {
        runBlocking {
            dao.upsert(
                SshConnection(
                    id = id ?: 0,
                    label = label,
                    host = host,
                    port = port,
                    username = username,
                    password = password,
                    privateKey = privateKey,
                    lastUsed = if (id != null) (dao.byId(id)?.lastUsed ?: 0L) else 0L,
                ),
            )
        }
    }
}

class EditConnectionViewModelFactory(private val ctx: Context, private val id: Long?) : ViewModelProvider.Factory {
    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>) =
        EditConnectionViewModel(ctx, id) as T
}
