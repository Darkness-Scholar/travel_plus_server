import { SignupErrors, SignupValues, SigninValues, SigninErrors } from "../types/auth.type"

let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const signupValidator = ({ username, password, confirmPassword, email }: SignupValues) => {

    const errors: SignupErrors = {}
    if (username.trim() === "") {
        errors.username = "Username must not be empty"
    } if (email.trim() === "") {
        errors.email = "Email must not be empty"
    } if (!email.match(emailRegex)) {
        errors.email = "Email is not valid"
    } if (password.trim() === "") {
        errors.password = "Password must not be empty"
    } if (password !== confirmPassword) {
        errors.password = "Password must match with confirm password"
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

export const signinValidator = ({ email, password }: SigninValues) => {
    const errors: SigninErrors = {}
    if (email.trim() === "") {
        errors.email = "Email must not be empty"
    } if (!email.match(emailRegex)) {
        errors.email = "Email is not valid"
    } if (password.trim() === "") {
        errors.password = "Password must not be empty"
    } 

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}