package com.shareholder.ssh

import android.app.Application
import com.shareholder.ssh.data.AppDatabase

class ShareholderSshApp : Application() {
    val db by lazy { AppDatabase.get(this) }
}
