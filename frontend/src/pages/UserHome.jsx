import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'
import mapBg from '../assets/simulated_map_bg.png'
import udriveLogo from '../assets/icon.png'

const UserHome = () => {
    const navigate = useNavigate()
    const { user, logoutUser } = useUserStore()

    // Form and panel state
    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
    const [activeInput, setActiveInput] = useState(null) // 'pickup' | 'destination'
    const [isPanelOpen, setIsPanelOpen] = useState(false)
    const [selectedVehicle, setSelectedVehicle] = useState(null)
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)

    // Close dropdown on click outside
    useEffect(() => {
        const handleOutsideClick = () => setUserMenuOpen(false)
        window.addEventListener('click', handleOutsideClick)
        return () => window.removeEventListener('click', handleOutsideClick)
    }, [])

    const handleLogout = async (e) => {
        e.stopPropagation()
        await logoutUser()
        navigate('/user/login')
    }

    const suggestions = [
        "Nexa Mall, 5th Avenue",
        "Central Station, Terminal 2",
        "City International Airport",
        "Tech Hub Park, Block C",
        "Udrive Headquarters, Downtown"
    ]

    const vehicles = [
        { id: 'go', name: 'Udrive Go', price: '$12.50', time: '10 mins away', desc: 'Affordable, everyday rides', icon: '🚗' },
        { id: 'premium', name: 'Udrive Premium', price: '$22.00', time: '8 mins away', desc: 'Luxury rides in high-end cars', icon: '🚙' },
        { id: 'moto', name: 'Udrive Moto', price: '$6.00', time: '4 mins away', desc: 'Fast, single-passenger bike rides', icon: '🏍️' },
        { id: 'auto', name: 'Udrive Auto', price: '$8.20', time: '7 mins away', desc: 'Convenient three-wheelers', icon: '🛺' }
    ]

    const handleSuggestionClick = (suggestion) => {
        if (activeInput === 'pickup') {
            setPickup(suggestion)
            setActiveInput('destination') // Advance focus
        } else if (activeInput === 'destination') {
            setDestination(suggestion)
            setActiveInput(null)
        }
    }

    const handleConfirmRide = () => {
        setIsBookingConfirmed(true)
        setTimeout(() => {
            setIsBookingConfirmed(false)
            setPickup('')
            setDestination('')
            setSelectedVehicle(null)
            setIsPanelOpen(false)
        }, 3500)
    }

    const showVehicleSelector = pickup.trim().length > 0 && destination.trim().length > 0

    return (
        <div className="relative h-screen w-full overflow-hidden bg-slate-900 font-sans">
            {/* Map Background Layer */}
            <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-1000 select-none scale-105"
                style={{ backgroundImage: `url(${mapBg})` }}
            >
                {/* Simulated map details overlay (glass vignette) */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />
            </div>

            {/* Header Toolbar */}
            <header className="absolute top-0 inset-x-0 p-4 lg:p-6 flex justify-between items-center z-30 pointer-events-none">
                {/* Logo */}
                <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-white/20 flex items-center gap-2 pointer-events-auto">
                    <img 
                        src={udriveLogo} 
                        alt="Udrive" 
                        className="h-7 w-auto object-contain"
                    />
                </div>

                {/* Profile menu */}
                <div className="relative pointer-events-auto">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation()
                            setUserMenuOpen(!userMenuOpen)
                        }}
                        className="h-10 w-10 bg-white/95 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg border border-white/20 font-bold text-slate-800 hover:bg-slate-50 transition active:scale-95"
                    >
                        {user?.fullname?.firstname?.[0]?.toUpperCase() || 'U'}
                    </button>
                    {userMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-fade-in-down">
                            <div className="px-4 py-2 border-b border-slate-100">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Signed in as</p>
                                <p className="text-sm font-bold text-slate-800 truncate">
                                    {user?.fullname?.firstname} {user?.fullname?.lastname}
                                </p>
                            </div>
                            <button 
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-semibold transition"
                            >
                                Log Out
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {/* Left Control Panel / Interactive Panel */}
            <div className="absolute left-0 bottom-0 lg:top-0 lg:bottom-auto w-full lg:w-[420px] p-4 lg:p-6 lg:pt-24 z-20">
                <div className="bg-white/95 backdrop-blur-lg rounded-2xl lg:rounded-3xl shadow-2xl border border-white/40 max-h-[85vh] lg:max-h-[calc(100vh-120px)] flex flex-col overflow-hidden transition-all duration-300">
                    
                    {/* Header: Find a Trip */}
                    <div className="p-5 pb-4 border-b border-slate-100">
                        <h2 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">Find a Trip</h2>
                        <p className="text-xs text-slate-500 mt-0.5">Enter your locations to request a ride</p>
                    </div>

                    {/* Form Fields */}
                    <div className="p-5 flex flex-col gap-3 relative">
                        {/* Connecting Line Graphic */}
                        <div className="absolute left-9 top-[48px] bottom-[48px] w-0.5 bg-slate-300 flex flex-col justify-between items-center pointer-events-none">
                            <div className="w-2 h-2 rounded-full bg-slate-900 -mt-1" />
                            <div className="w-2 h-2 rounded-full bg-slate-900 -mb-1" />
                        </div>

                        {/* Pickup Location */}
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-600 shrink-0">
                                A
                            </div>
                            <input 
                                type="text"
                                value={pickup}
                                onChange={(e) => {
                                    setPickup(e.target.value)
                                    setIsPanelOpen(true)
                                }}
                                onFocus={() => {
                                    setIsPanelOpen(true)
                                    setActiveInput('pickup')
                                }}
                                placeholder="Enter pickup location"
                                className="w-full bg-slate-50 hover:bg-slate-100/50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition"
                            />
                        </div>

                        {/* Destination */}
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs shrink-0">
                                B
                            </div>
                            <input 
                                type="text"
                                value={destination}
                                onChange={(e) => {
                                    setDestination(e.target.value)
                                    setIsPanelOpen(true)
                                }}
                                onFocus={() => {
                                    setIsPanelOpen(true)
                                    setActiveInput('destination')
                                }}
                                placeholder="Where to?"
                                className="w-full bg-slate-50 hover:bg-slate-100/50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition"
                            />
                        </div>
                    </div>

                    {/* Bottom Dynamic Container: Suggestions OR Ride Options */}
                    <div className="flex-1 overflow-y-auto px-5 pb-5 max-h-[300px] lg:max-h-none border-t border-slate-100 pt-4">
                        
                        {/* 1. Suggestions State */}
                        {isPanelOpen && !showVehicleSelector && (
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Suggestions</h3>
                                <div className="flex flex-col gap-1">
                                    {suggestions.map((s, idx) => (
                                        <button 
                                            key={idx}
                                            onClick={() => handleSuggestionClick(s)}
                                            className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 active:bg-slate-100 flex items-center gap-3 transition"
                                        >
                                            <span className="text-lg">📍</span>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-800">{s.split(',')[0]}</p>
                                                <p className="text-xs text-slate-500">{s.split(',')[1] || 'Nearby'}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 2. Vehicle Selector State */}
                        {showVehicleSelector && (
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Available Rides</h3>
                                <div className="flex flex-col gap-2">
                                    {vehicles.map((v) => (
                                        <button 
                                            key={v.id}
                                            onClick={() => setSelectedVehicle(v.id)}
                                            className={`w-full text-left p-3 rounded-xl border flex items-center justify-between transition ${
                                                selectedVehicle === v.id 
                                                    ? 'border-black bg-slate-50/80 ring-2 ring-black/5' 
                                                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl lg:text-3xl bg-slate-100 p-2 rounded-lg">{v.icon}</span>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">{v.name}</p>
                                                    <p className="text-xs text-slate-500">{v.desc}</p>
                                                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{v.time}</p>
                                                </div>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <p className="text-sm font-black text-slate-900">{v.price}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {/* Confirm booking button */}
                                <button 
                                    onClick={handleConfirmRide}
                                    disabled={!selectedVehicle}
                                    className="w-full bg-black text-white font-bold py-3.5 px-4 rounded-xl mt-5 shadow-lg shadow-black/10 hover:bg-zinc-800 transition disabled:bg-slate-300 disabled:shadow-none"
                                >
                                    Confirm booking
                                </button>
                            </div>
                        )}

                        {/* 3. Empty State instruction */}
                        {!isPanelOpen && !showVehicleSelector && (
                            <div className="text-center py-6 text-slate-400">
                                <p className="text-sm">Enter destinations above to view options</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Booking Confirmed Success Overlay */}
            {isBookingConfirmed && (
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6 animate-fade-in">
                    <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center animate-scale-up">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-4xl mb-6 shadow-lg shadow-green-100/30">
                            ✓
                        </div>
                        <h2 className="text-2xl font-black text-slate-900">Ride Booked Successfully!</h2>
                        <p className="text-slate-500 text-sm mt-2 mb-6">
                            Your Udrive driver is on their way to pick you up at <span className="font-semibold text-slate-800">{pickup}</span>.
                        </p>
                        
                        <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-100 text-left flex flex-col gap-2">
                            <div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pickup</span>
                                <p className="text-xs font-semibold text-slate-800 truncate">{pickup}</p>
                            </div>
                            <div className="border-t border-slate-200/50 pt-2 mt-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dropoff</span>
                                <p className="text-xs font-semibold text-slate-800 truncate">{destination}</p>
                            </div>
                        </div>

                        <p className="text-xs text-slate-400 mt-6 animate-pulse">Assigning driver partner...</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserHome
