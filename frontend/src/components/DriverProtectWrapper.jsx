import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DriverProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/driver/login')
            return
        }

        fetch('http://localhost:5000/api/drivers/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            if (!res.ok) {
                localStorage.removeItem('token')
                localStorage.removeItem('driver')
                navigate('/driver/login')
            } else {
                setIsLoading(false)
            }
        })
        .catch(() => {
            localStorage.removeItem('token')
            localStorage.removeItem('driver')
            navigate('/driver/login')
        })
    }, [token, navigate])

    if (isLoading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-slate-50">
                <p className="text-slate-600 font-medium">Loading...</p>
            </div>
        )
    }

    return <>{children}</>
}

export default DriverProtectWrapper
