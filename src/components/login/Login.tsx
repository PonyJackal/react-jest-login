import React, { useState } from 'react'
import './Login.scss'

const Login = () => {
  //sate for form
  const [formData, setFormData] = useState({
    values: {
      email: '',
      password: ''
    },
    errors: {
      email: '',
      password: ''
    },
    isValid: false,
    isSubmittted: false
  })
  //input change handler
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      values: {
        ...formData.values,
        [name]: value
      }
    })
  }
  //form submission handler
  const handleSubmit = (event) => {
    const errors = validation()
    const isValid = !errors.email && !errors.password ? true : false
    setFormData({
      ...formData,
      errors: {
        email: errors.email,
        password: errors.password
      },
      isValid: isValid
    })
    if (isValid) {
      setFormData({
        ...formData,
        isSubmittted: true,
        errors: {
          email: "",
          password: ""
        }
      })
    }
  }
  //form validation
  const validation = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    const errors = {
      email: "",
      password: ""
    }

    if (!formData.values.email) {
      errors.email = "Email cannot be blank"
    }
    else if (!regex.test(formData.values.email)) {
      errors.email = "Invalid email format"
    }

    if (!formData.values.password) {
      errors.password = "Password cannot be blank"
    }
    else if (formData.values.password.length < 4) {
      errors.password = "Password must be more than 4 characters"
    }
    return errors;
  }

  return (
    <div className="container">
      <h1>Sign in to continue</h1>
      {formData.isSubmittted && (
        <span className="success-msg">Form submitted successfully</span>
      )}
      <form>
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

        <button data-testid="submit-button" type="button" onClick={handleSubmit}>Sign In</button>
      </form>
    </div>
  )
}

export default Login