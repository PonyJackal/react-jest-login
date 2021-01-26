import React from 'react'
import ReactDOM from 'react-dom'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import renderer from 'react-test-renderer'

import Login from './Login'

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

    it("Forspanm Success", () => {
        const login = render(<Login />)
        const inputEmail = login.getByLabelText("Email")
        const inputPassword = login.getByLabelText("Password")
        const submitButton = login.getByTestId('submit-button')

        fireEvent.change(inputEmail, { target: { value: "a@a.com" } })
        fireEvent.change(inputPassword, { target: { value: "1234" } })
        fireEvent.click(submitButton)
        //show submit text
        screen.getByText("Form submitted successfully")
    })

    it("Error messages should be removed if form is valid", () => {
        const login = render(<Login />)
        const inputEmail = login.getByLabelText("Email")
        const inputPassword = login.getByLabelText("Password")
        const submitButton = login.getByTestId('submit-button')

        fireEvent.change(inputEmail, { target: { value: "a" } })
        fireEvent.change(inputPassword, { target: { value: "1" } })
        fireEvent.click(submitButton)

        fireEvent.change(inputEmail, { target: { value: "a@a.com" } })
        fireEvent.change(inputPassword, { target: { value: "1234" } })
        fireEvent.click(submitButton)
        //show submit text
        screen.getByText("Form submitted successfully")
        //error messages sbould not exist
        const emailError1 = screen.queryByText("Email cannot be blank")
        const emailError2 = screen.queryByText("Invalid email format")
        const passwordError1 = screen.queryByText("Password cannot be blank")
        const passwordError2 = screen.queryByText("Password must be more than 4 characters")
        expect(emailError1).toBeNull()
        expect(emailError2).toBeNull()
        expect(passwordError1).toBeNull()
        expect(passwordError2).toBeNull()
    })
})
