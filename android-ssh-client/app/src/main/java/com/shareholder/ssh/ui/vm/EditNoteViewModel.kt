package com.shareholder.ssh.ui.vm

import android.content.Context
import androidx.lifecycle.*
import com.shareholder.ssh.ShareholderSshApp
import com.shareholder.ssh.data.Note
import kotlinx.coroutines.runBlocking

class EditNoteViewModel(ctx: Context, private val id: Long?) : ViewModel() {
    private val app = ctx.applicationContext as ShareholderSshApp
    private val noteDao = app.db.noteDao()
    val connections = app.db.connectionDao().all()

    suspend fun load(): Note? = id?.let { noteDao.byId(it) }

    fun save(title: String, body: String, connectionId: Long?) {
        runBlocking {
            noteDao.upsert(
                Note(
                    id = id ?: 0,
                    title = title,
                    body = body,
                    connectionId = connectionId,
                    updatedAt = System.currentTimeMillis(),
                ),
            )
        }
    }
}

class EditNoteViewModelFactory(private val ctx: Context, private val id: Long?) : ViewModelProvider.Factory {
    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>) = EditNoteViewModel(ctx, id) as T
}
