"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const auth_controller_1 = require("./auth.controller");
class AuthRouter {
    router;
    path;
    constructor() {
        this.path = "/auth";
        this.router = express.Router();
        this.router.get("/", (req, res) => {
            res.send("Auth :: live");
        });
        this.router.post("/signin", auth_controller_1.default.signin);
        this.router.post("/signup", auth_controller_1.default.signup);
    }
}
const Router = new AuthRouter();
exports.default = Router;
