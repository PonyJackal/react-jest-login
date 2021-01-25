import React, { useState } from 'react'
import './Login.scss'

const Login = () => {
    const [formData, setFormData] = useState({
        values: {
            email: '',
            password: ''
        },
        errors: {
            email: '',
            password: ''
        },
        isValid: false
    })

    const handleChange = (event) => {
        setFormData({
            ...formData,
            values: {
                [event.target.name]: event.target.value
            }
        })
    }
    const handleSubmit = () => {
        if(!formData.isValid){
            console.log(formData.values)
        }
    }

    return (
        <div className="login">
            <h1>Login Form</h1>
            <form className="login-form">
                <label>Email: <input name="email" onChange={handleChange} vlaue={formData.values.email} /></label>
                <label>Password: <input name="password" onChange={handleChange} vlaue={formData.values.password}/></label>
                <button onClick={handleSubmit} disabled={!formData.isValid}>Login</button>
            </form>
        </div>
    )
}

export default Login