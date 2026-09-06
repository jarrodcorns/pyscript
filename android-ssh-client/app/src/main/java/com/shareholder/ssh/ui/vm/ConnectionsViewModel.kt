package com.shareholder.ssh.ui.vm

import android.content.Context
import androidx.lifecycle.*
import com.shareholder.ssh.ShareholderSshApp
import com.shareholder.ssh.data.SshConnection
import kotlinx.coroutines.launch

class ConnectionsViewModel(ctx: Context) : ViewModel() {
    private val db = (ctx.applicationContext as ShareholderSshApp).db
    val connections = db.connectionDao().all()

    fun delete(c: SshConnection) = viewModelScope.launch { db.connectionDao().delete(c) }
    fun touch(c: SshConnection) = viewModelScope.launch { db.connectionDao().touch(c.id) }
}

class ConnectionsViewModelFactory(private val ctx: Context) : ViewModelProvider.Factory {
    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>) =
        ConnectionsViewModel(ctx) as T
}
