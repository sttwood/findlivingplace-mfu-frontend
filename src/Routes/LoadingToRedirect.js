import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const LoadingToRedirect = () => {
    const [ count, setCount ] = useState(3)
    const navigate = useNavigate()

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount)
        }, 1000)
        // Redirect
        count === 0 && navigate('/')

        return () => clearInterval(interval)
        // eslint-disable-next-line
    }, [ count ])

    return <div style={{ height: '100vh' }}>
        <h1>You don't have Permission, redirect in {count}</h1>

    </div>
}

export default LoadingToRedirect
