package com.shareholder.ssh.data

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "notes")
data class Note(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val title: String = "",
    val body: String = "",
    val connectionId: Long? = null,
    val updatedAt: Long = System.currentTimeMillis(),
)
