import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DriverDataContext } from '../context/DriverContext'
import udriveLogo from '../assets/icon.png'

const DriverSignUp = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [color, setColor] = useState('')
    const [plate, setPlate] = useState('')
    const [capacity, setCapacity] = useState('')
    const [vehicleType, setVehicleType] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const { setDriver } = useContext(DriverDataContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (!firstName || !lastName || !email || !password || !color || !plate || !capacity || !vehicleType) {
            setError('Please fill in all fields')
            return
        }

        try {
            setLoading(true)
            const response = await fetch('http://localhost:5000/api/drivers/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullName: {
                        firstName,
                        lastName
                    },
                    email,
                    password,
                    vehicleType: {
                        color,
                        plate,
                        capacity: parseInt(capacity, 10),
                        vehicleType
                    }
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed. Please check details.')
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
            <div className="w-full">
                {/* Logo */}
                <header className="mb-6">
                    <img 
                        src={udriveLogo} 
                        alt="Udrive Logo" 
                        className="h-10 w-auto object-contain"
                    />
                </header>

                {/* Registration Form */}
                <main className="max-w-xl mx-auto w-full bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
                    <div className="flex items-center gap-2 mb-6">
                        <h2 className="text-2xl font-bold text-slate-900">Partner Registration</h2>
                        <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded-full">Driver</span>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium mb-4 border border-red-100">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* Account Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">First name</label>
                                <input 
                                    type="text"
                                    required
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="Jane"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Last name</label>
                                <input 
                                    type="text"
                                    required
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Doe"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                    placeholder="Min. 6 characters"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                                />
                            </div>
                        </div>

                        {/* Vehicle Section */}
                        <div className="border-t border-slate-100 pt-4 mt-2">
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Vehicle Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Vehicle color</label>
                                    <input 
                                        type="text"
                                        required
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        placeholder="Black"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Vehicle license plate</label>
                                    <input 
                                        type="text"
                                        required
                                        value={plate}
                                        onChange={(e) => setPlate(e.target.value)}
                                        placeholder="MH12-AB-1234"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Passenger capacity</label>
                                    <input 
                                        type="number"
                                        required
                                        min="1"
                                        value={capacity}
                                        onChange={(e) => setCapacity(e.target.value)}
                                        placeholder="4"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Vehicle type</label>
                                    <select 
                                        required
                                        value={vehicleType}
                                        onChange={(e) => setVehicleType(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                                    >
                                        <option value="" disabled>Select Vehicle Type</option>
                                        <option value="car">Car (Standard)</option>
                                        <option value="motorcycle">Motorcycle</option>
                                        <option value="auto">Auto-rickshaw</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black hover:bg-zinc-800 text-white font-semibold py-3.5 px-4 rounded-lg mt-4 transition disabled:bg-zinc-400"
                        >
                            {loading ? 'Registering...' : 'Register and Continue'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-500 mt-6">
                        Already have a partner account?{' '}
                        <Link to="/driver/login" className="text-amber-700 font-semibold hover:underline">
                            Login here
                        </Link>
                    </p>
                </main>
            </div>

            <footer className="max-w-xl mx-auto w-full mt-8">
                <p className="text-xs text-slate-400 text-center leading-normal">
                    By registering, you agree to Udrive's Terms and Conditions and privacy policies.
                </p>
            </footer>
        </div>
    )
}

export default DriverSignUp