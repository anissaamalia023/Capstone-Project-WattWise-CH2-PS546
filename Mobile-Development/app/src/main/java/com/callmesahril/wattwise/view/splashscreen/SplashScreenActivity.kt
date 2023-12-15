package com.callmesahril.wattwise.view.splashscreen

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.callmesahril.wattwise.R
import com.callmesahril.wattwise.view.login.LoginActivity

class SplashScreenActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.activity_splash_screen)
        supportActionBar?.hide()
        val splashScreenDuration = 1000
        val mainActivityIntent = Intent(this, LoginActivity::class.java)

        Thread {
            Thread.sleep(splashScreenDuration.toLong())
            startActivity(mainActivityIntent)
            finish()
        }.start()
    }
}