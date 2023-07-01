"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinValidator = exports.signupValidator = void 0;
let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const signupValidator = ({ username, password, confirmPassword, email }) => {
    const errors = {};
    if (username.trim() === "") {
        errors.username = "Username must not be empty";
    }
    if (email.trim() === "") {
        errors.email = "Email must not be empty";
    }
    if (!email.match(emailRegex)) {
        errors.email = "Email is not valid";
    }
    if (password.trim() === "") {
        errors.password = "Password must not be empty";
    }
    if (password !== confirmPassword) {
        errors.password = "Password must match with confirm password";
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
};
exports.signupValidator = signupValidator;
const signinValidator = ({ email, password }) => {
    const errors = {};
    if (email.trim() === "") {
        errors.email = "Email must not be empty";
    }
    if (!email.match(emailRegex)) {
        errors.email = "Email is not valid";
    }
    if (password.trim() === "") {
        errors.password = "Password must not be empty";
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
};
exports.signinValidator = signinValidator;
