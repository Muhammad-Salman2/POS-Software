import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

export default function Login() {
    return (
        <>
            <Navbar />
            <h1>You'r at login page</h1>
            <li><Link to = "/slidebaar">Slidebaar</Link></li>
            <li><Link to = "/home">Home</Link></li>
        </>
    )
}
