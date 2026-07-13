import React from 'react'
import { Link } from 'react-router-dom'
import desktopBg from '../assets/desktopudrive-bg.png'
import mobileBg from '../assets/mobileudrive-bg.png'
import udriveLogo from '../assets/icon.png'

const Home = () => {
    return (
        <div
            className="relative h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col justify-between overflow-hidden udrive-home-bg"
            style={{
                '--bg-image-mobile': `url(${mobileBg})`,
                '--bg-image-desktop': `url(${desktopBg})`
            }}
        >
            {/* Dark gradient overlay for modern contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80 z-0" />

            {/* Header: Logo */}
            <header className="relative z-10 pt-10 pl-10">
                <img
                    className="h-12 w-auto object-contain filter brightness-0 invert"
                    src={udriveLogo}
                    alt="Udrive Logo"
                />
            </header>

            {/* Onboarding Control Panel */}
            <main className="relative z-10 w-full bg-white dark:bg-zinc-900 px-6 py-8 rounded-t-3xl shadow-2xl transition-all duration-300 md:max-w-md md:mx-auto md:mb-8 md:rounded-3xl">
                <div className="mb-6 text-center md:text-left">
                    <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Get Started with Udrive
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
                        Choose your path to start traveling or earning with Udrive.
                    </p>
                </div>

                <div className="flex flex-col gap-3.5">
                    <Link
                        to="/user/login"
                        className="flex items-center justify-center w-full bg-black hover:bg-zinc-800 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-black/10 text-center"
                    >
                        Continue as User
                    </Link>

                    <Link
                        to="/driver/login"
                        className="flex items-center justify-center w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 text-center"
                    >
                        Continue as Driver
                    </Link>
                </div>
            </main>
        </div>
    )
}

export default Home