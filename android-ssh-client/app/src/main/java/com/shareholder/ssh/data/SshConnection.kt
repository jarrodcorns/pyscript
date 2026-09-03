package com.shareholder.ssh.data

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "connections")
data class SshConnection(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val label: String = "",
    val host: String = "",
    val port: Int = 22,
    val username: String = "",
    val password: String = "",
    val privateKey: String = "",
    val lastUsed: Long = 0L,
)
