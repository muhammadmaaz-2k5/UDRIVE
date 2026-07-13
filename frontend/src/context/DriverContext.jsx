import React, { createContext, useState } from 'react'

export const DriverDataContext = createContext()

const DriverContext = ({ children }) => {
    const [driver, setDriver] = useState({
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
    })

    return (
        <DriverDataContext.Provider value={{ driver, setDriver }}>
            {children}
        </DriverDataContext.Provider>
    )
}

export default DriverContext
