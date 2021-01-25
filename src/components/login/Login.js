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
    if (!formData.isValid) {
      console.log(formData.values)
    }
  }

  return (
    <div className="container">
      <h1>Sign in to continue</h1>
      {Object.keys(formData.errors).length === 0 && formData.isValid && (
        <span className="success-msg">Form submitted successfully</span>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.values.email}
            onChange={handleChange}
            className={formData.errors.email && "input-error"}
          />
          {formData.errors.email && (
            <span className="error">{formData.errors.email}</span>
          )}
        </div>

        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.values.password}
            onChange={handleChange}
            className={formData.errors.password && "input-error"}
          />
          {formData.errors.password && (
            <span className="error">{formData.errors.password}</span>
          )}
        </div>

        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}

export default Login