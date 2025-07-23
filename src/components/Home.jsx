import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

export default function Home() {
    return (
        <>
            <Navbar />
            <h1>You'r at home page</h1>
            <li><Link to="/slidebaar">Slidebaar</Link></li>
            <li><Link to="/login">Login</Link></li>
        </>
    )
}
