"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
let auth = {
    signup: {
        path: "/signup",
        method: 'post',
        controller: controller_1.default.signup
    },
    signin: {
        path: "/signin",
        method: 'get',
        controller: controller_1.default.signin
    }
};
exports.default = auth;
