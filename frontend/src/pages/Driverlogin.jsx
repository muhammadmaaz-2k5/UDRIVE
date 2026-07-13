import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DriverDataContext } from '../context/DriverContext'
import udriveLogo from '../assets/icon.png'

const Driverlogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const { setDriver } = useContext(DriverDataContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (!email || !password) {
            setError('Please fill in all fields')
            return
        }

        try {
            setLoading(true)
            const response = await fetch('http://localhost:5000/api/drivers/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Login failed. Please check your credentials.')
            }

            // Save state & token
            localStorage.setItem('token', data.token)
            localStorage.setItem('driver', JSON.stringify(data.driver))
            setDriver(data.driver)

            // Redirect to home/dashboard
            navigate('/')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-7">
            <div>
                {/* Logo */}
                <header className="mb-8">
                    <img 
                        src={udriveLogo} 
                        alt="Udrive Logo" 
                        className="h-10 w-auto object-contain"
                    />
                </header>

                {/* Login Form */}
                <main className="max-w-md mx-auto w-full bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
                    <div className="flex items-center gap-2 mb-6">
                        <h2 className="text-2xl font-bold text-slate-900">Driver Login</h2>
                        <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded-full">Partner</span>
                    </div>
                    
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium mb-4 border border-red-100">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email address</label>
                            <input 
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="driver@example.com"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                            <input 
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                            />
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black hover:bg-zinc-800 text-white font-semibold py-3 px-4 rounded-lg mt-2 transition disabled:bg-zinc-400"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-500 mt-6">
                        Want to drive with us?{' '}
                        <Link to="/driver/signup" className="text-amber-700 font-semibold hover:underline">
                            Register as Partner
                        </Link>
                    </p>
                </main>
            </div>

            {/* Link to User Login */}
            <div className="max-w-md mx-auto w-full mt-8">
                <Link 
                    to="/user/login"
                    className="flex items-center justify-center w-full bg-slate-900 hover:bg-black text-white font-semibold py-3.5 px-4 rounded-lg transition text-center shadow-md"
                >
                    Sign in as User
                </Link>
            </div>
        </div>
    )
}

export default Driverlogin