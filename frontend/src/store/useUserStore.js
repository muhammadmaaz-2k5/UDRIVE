import { create } from 'zustand'

export const useUserStore = create((set, get) => ({
    user: JSON.parse(localStorage.getItem('user')) || {
        email: '',
        fullname: {
            firstname: '',
            lastname: ''
        }
    },
    isLoading: false,
    error: null,

    setUser: (user) => set({ user }),
    clearError: () => set({ error: null }),

    loginUser: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
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
            localStorage.setItem('user', JSON.stringify(data.user))
            set({ user: data.user, isLoading: false })
            return true
        } catch (err) {
            set({ error: err.message, isLoading: false })
            return false
        }
    },

    registerUser: async (firstname, lastname, email, password) => {
        set({ isLoading: true, error: null })
        try {
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
                throw new Error(data.message || 'Registration failed. Please try again.')
            }

            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            set({ user: data.user, isLoading: false })
            return true
        } catch (err) {
            set({ error: err.message, isLoading: false })
            return false
        }
    },

    logoutUser: async () => {
        const token = localStorage.getItem('token')
        set({ isLoading: true, error: null })
        try {
            await fetch('http://localhost:5000/api/users/logout', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        } catch (err) {
            console.error('Logout request failed:', err)
        } finally {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            set({
                user: {
                    email: '',
                    fullname: { firstname: '', lastname: '' }
                },
                isLoading: false
            })
        }
    }
}))
