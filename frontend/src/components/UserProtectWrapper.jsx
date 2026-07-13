import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/user/login')
            return
        }

        fetch('http://localhost:5000/api/users/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            if (!res.ok) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                navigate('/user/login')
            } else {
                setIsLoading(false)
            }
        })
        .catch(() => {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            navigate('/user/login')
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

export default UserProtectWrapper
