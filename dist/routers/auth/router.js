"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("./auth.controller");
let auth = [
    {
        method: 'get',
        path: '/signin',
        controller: auth_controller_1.default.signin
    },
    {
        method: 'post',
        path: '/signup',
        controller: auth_controller_1.default.signup
    }
];
exports.default = auth;
