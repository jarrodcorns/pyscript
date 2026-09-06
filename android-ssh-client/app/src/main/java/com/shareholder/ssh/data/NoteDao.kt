package com.shareholder.ssh.data

import androidx.room.*
import kotlinx.coroutines.flow.Flow

@Dao
interface NoteDao {
    @Query("SELECT * FROM notes ORDER BY updatedAt DESC")
    fun all(): Flow<List<Note>>

    @Query("SELECT * FROM notes WHERE connectionId = :connId ORDER BY updatedAt DESC")
    fun forConnection(connId: Long): Flow<List<Note>>

    @Query("SELECT * FROM notes WHERE id = :id")
    suspend fun byId(id: Long): Note?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun upsert(n: Note): Long

    @Delete
    suspend fun delete(n: Note)
}
