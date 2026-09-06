package com.shareholder.ssh.ui.vm

import android.content.Context
import androidx.lifecycle.*
import com.shareholder.ssh.ShareholderSshApp
import com.shareholder.ssh.data.Note
import kotlinx.coroutines.launch

class NotesViewModel(ctx: Context) : ViewModel() {
    private val dao = (ctx.applicationContext as ShareholderSshApp).db.noteDao()
    val notes = dao.all()

    fun delete(n: Note) = viewModelScope.launch { dao.delete(n) }
}

class NotesViewModelFactory(private val ctx: Context) : ViewModelProvider.Factory {
    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>) = NotesViewModel(ctx) as T
}
