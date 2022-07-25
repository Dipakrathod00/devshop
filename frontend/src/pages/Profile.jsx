import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
export default function Profile() {
    const {login} = useSelector(state=> state.user )
    console.log(login);
    const navigate = useNavigate()
    React.useEffect(() => {
        const x = localStorage.getItem("login")
        if (!x) {
            navigate("/login")
        }

    }, [])

    return (
        <div >
            <h1>Name: {login.name}</h1>
        </div>
    )
}
