package com.shareholder.ssh.ui

import androidx.compose.runtime.Composable
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.shareholder.ssh.ui.screens.*
import com.shareholder.ssh.ui.theme.SshTheme

@Composable
fun SshApp() {
    SshTheme {
        val nav = rememberNavController()
        NavHost(navController = nav, startDestination = "connections") {
            composable("connections") {
                ConnectionsScreen(nav)
            }
            composable(
                "edit_connection?id={id}",
                arguments = listOf(navArgument("id") {
                    type = NavType.LongType; defaultValue = -1L
                }),
            ) { entry ->
                val id = entry.arguments?.getLong("id") ?: -1L
                EditConnectionScreen(nav = nav, connectionId = id.takeIf { it >= 0 })
            }
            composable(
                "terminal/{id}",
                arguments = listOf(navArgument("id") { type = NavType.LongType }),
            ) { entry ->
                TerminalScreen(nav = nav, connectionId = entry.arguments!!.getLong("id"))
            }
            composable("notes") {
                NotesScreen(nav)
            }
            composable(
                "edit_note?id={id}&connId={connId}",
                arguments = listOf(
                    navArgument("id") { type = NavType.LongType; defaultValue = -1L },
                    navArgument("connId") { type = NavType.LongType; defaultValue = -1L },
                ),
            ) { entry ->
                val id = entry.arguments?.getLong("id") ?: -1L
                val connId = entry.arguments?.getLong("connId") ?: -1L
                EditNoteScreen(
                    nav = nav,
                    noteId = id.takeIf { it >= 0 },
                    preselectedConnectionId = connId.takeIf { it >= 0 },
                )
            }
        }
    }
}
