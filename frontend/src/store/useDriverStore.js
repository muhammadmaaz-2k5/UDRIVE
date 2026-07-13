import { create } from 'zustand'

export const useDriverStore = create((set, get) => ({
    driver: JSON.parse(localStorage.getItem('driver')) || {
        email: '',
        fullName: {
            firstName: '',
            lastName: ''
        },
        vehicleType: {
            color: '',
            plate: '',
            capacity: 0,
            vehicleType: ''
        }
    },
    isLoading: false,
    error: null,

    setDriver: (driver) => set({ driver }),
    clearError: () => set({ error: null }),

    loginDriver: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
            const response = await fetch('http://localhost:5000/api/drivers/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Login failed. Please check credentials.')
            }

            localStorage.setItem('token', data.token)
            localStorage.setItem('driver', JSON.stringify(data.driver))
            set({ driver: data.driver, isLoading: false })
            return true
        } catch (err) {
            set({ error: err.message, isLoading: false })
            return false
        }
    },

    registerDriver: async (firstName, lastName, email, password, color, plate, capacity, vehicleType) => {
        set({ isLoading: true, error: null })
        try {
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
                throw new Error(data.message || 'Registration failed. Please try again.')
            }

            localStorage.setItem('token', data.token)
            localStorage.setItem('driver', JSON.stringify(data.driver))
            set({ driver: data.driver, isLoading: false })
            return true
        } catch (err) {
            set({ error: err.message, isLoading: false })
            return false
        }
    },

    logoutDriver: async () => {
        const token = localStorage.getItem('token')
        set({ isLoading: true, error: null })
        try {
            await fetch('http://localhost:5000/api/drivers/logout', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        } catch (err) {
            console.error('Logout request failed:', err)
        } finally {
            localStorage.removeItem('token')
            localStorage.removeItem('driver')
            set({
                driver: {
                    email: '',
                    fullName: { firstName: '', lastName: '' },
                    vehicleType: { color: '', plate: '', capacity: 0, vehicleType: '' }
                },
                isLoading: false
            })
        }
    }
}))
