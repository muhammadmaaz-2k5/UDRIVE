import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import udriveLogo from '../assets/icon.png'

const UserSignUp = () => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const { setUser } = useContext(UserDataContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (!firstname || !lastname || !email || !password) {
            setError('Please fill in all fields')
            return
        }

        try {
            setLoading(true)
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullname: {
                        firstname,
                        lastname
                    },
                    email,
                    password
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed. Please check details.')
            }

            // Save state & token
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            setUser(data.user)

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
                <header className="mb-6">
                    <img 
                        src={udriveLogo} 
                        alt="Udrive Logo" 
                        className="h-10 w-auto object-contain"
                    />
                </header>

                {/* Signup Form */}
                <main className="max-w-md mx-auto w-full bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Create your account</h2>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium mb-4 border border-red-100">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">First name</label>
                                <input 
                                    type="text"
                                    required
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    placeholder="John"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Last name</label>
                                <input 
                                    type="text"
                                    required
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    placeholder="Doe"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email address</label>
                            <input 
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email@example.com"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                            <input 
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Min. 6 characters"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition"
                            />
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black hover:bg-zinc-800 text-white font-semibold py-3 px-4 rounded-lg mt-2 transition disabled:bg-zinc-400"
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-500 mt-6">
                        Already have an account?{' '}
                        <Link to="/user/login" className="text-blue-600 font-semibold hover:underline">
                            Login here
                        </Link>
                    </p>
                </main>
            </div>
            
            {/* Legal text footer */}
            <footer className="max-w-md mx-auto w-full mt-8">
                <p className="text-xs text-slate-400 text-center leading-normal">
                    By proceeding, you consent to receive calls, SMS or WhatsApp messages, including by automated means, from Udrive and its affiliates to the number provided.
                </p>
            </footer>
        </div>
    )
}

export default UserSignUp