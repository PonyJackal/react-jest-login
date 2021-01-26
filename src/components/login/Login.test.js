import React from 'react'
import ReactDOM from 'react-dom'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import renderer from 'react-test-renderer'

import Login from './../login/Login'

afterEach(cleanup)

describe("render components without crashing", () => {
    it("renders without crashing", () => {
        const div = document.createElement('div')
        ReactDOM.render(<Login />, div)
    })

    it("matches snapshot", () => {
        const login = renderer.create(<Login />).toJSON()
        expect(login).toMatchSnapshot()
    })
})

describe("check validation", () => {
    it("Email can not be blank", () => {
        const login = render(<Login />)
        const inputEmail = login.getByLabelText("Email")
        const submitButton = login.getByTestId('submit-button')

        fireEvent.change(inputEmail, { target: { value: "" } })
        fireEvent.click(submitButton)

        screen.getByText("Email cannot be blank")
    })

    it("Check invalid email", () => {
        const login = render(<Login />)
        const inputEmail = login.getByLabelText("Email")
        const submitButton = login.getByTestId('submit-button')

        fireEvent.change(inputEmail, { target: { value: "adsf" } })
        fireEvent.click(submitButton)

        screen.getByText("Invalid email format")
    })

    it("Password can not be blank", () => {
        const login = render(<Login />)
        const inputPassword = login.getByLabelText("Password")
        const submitButton = login.getByTestId('submit-button')

        fireEvent.change(inputPassword, { target: { value: "" } })
        fireEvent.click(submitButton)

        screen.getByText("Password cannot be blank")
    })

    it("Password must be more than 4 characters", () => {
        const login = render(<Login />)
        const inputPassword = login.getByLabelText("Password")
        const submitButton = login.getByTestId('submit-button')

        fireEvent.change(inputPassword, { target: { value: "aa" } })
        fireEvent.click(submitButton)

        screen.getByText("Password must be more than 4 characters")
    })

    it("Form Success", () => {
        const login = render(<Login />)
        const inputEmail = login.getByLabelText("Email")
        const inputPassword = login.getByLabelText("Password")
        const submitButton = login.getByTestId('submit-button')

        fireEvent.change(inputEmail, { target: { value: "a@a.com" } })
        fireEvent.change(inputPassword, { target: { value: "1234" } })
        fireEvent.click(submitButton)

        screen.getByText("Form submitted successfully")
    })
})
