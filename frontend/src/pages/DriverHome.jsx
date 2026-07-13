import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDriverStore } from '../store/useDriverStore'

const DriverHome = () => {
    const navigate = useNavigate()
    const { driver, logoutDriver } = useDriverStore()

    const handleLogout = async () => {
        await logoutDriver()
        navigate('/driver/login')
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-2xl mb-4 shadow-lg shadow-amber-600/20">
                    {driver?.fullName?.firstName?.[0]?.toUpperCase() || 'D'}
                </div>
                <h1 className="text-2xl font-bold text-slate-900">Driver Partner Dashboard</h1>
                <p className="text-slate-500 text-sm mt-1 mb-6">Successfully Authenticated</p>
                
                <div className="w-full bg-slate-50 rounded-xl p-4 mb-6 border border-slate-200/50 text-left flex flex-col gap-2">
                    <div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Partner Name</span>
                        <p className="text-sm font-semibold text-slate-800">
                            {driver?.fullName?.firstName} {driver?.fullName?.lastName}
                        </p>
                    </div>
                    <div className="border-t border-slate-200/50 pt-2 mt-1">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email</span>
                        <p className="text-sm font-semibold text-slate-800">{driver?.email}</p>
                    </div>
                    <div className="border-t border-slate-200/50 pt-2 mt-1">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Vehicle Details</span>
                        <p className="text-sm font-semibold text-slate-800">
                            {driver?.vehicleType?.color} {driver?.vehicleType?.vehicleType} ({driver?.vehicleType?.plate})
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">Capacity: {driver?.vehicleType?.capacity} passengers</p>
                    </div>
                </div>

                <button 
                    onClick={handleLogout}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl transition shadow-lg shadow-red-600/10"
                >
                    Log Out
                </button>
            </div>
        </div>
    )
}

export default DriverHome
