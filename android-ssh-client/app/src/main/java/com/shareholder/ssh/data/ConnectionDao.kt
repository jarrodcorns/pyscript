package com.shareholder.ssh.data

import androidx.room.*
import kotlinx.coroutines.flow.Flow

@Dao
interface ConnectionDao {
    @Query("SELECT * FROM connections ORDER BY lastUsed DESC")
    fun all(): Flow<List<SshConnection>>

    @Query("SELECT * FROM connections WHERE id = :id")
    suspend fun byId(id: Long): SshConnection?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun upsert(c: SshConnection): Long

    @Delete
    suspend fun delete(c: SshConnection)

    @Query("UPDATE connections SET lastUsed = :ts WHERE id = :id")
    suspend fun touch(id: Long, ts: Long = System.currentTimeMillis())
}
