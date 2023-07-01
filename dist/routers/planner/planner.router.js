"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class PlannerRouter {
    router;
    path;
    constructor() {
        this.path = "planner";
        this.router = express.Router();
        this.router.get("/", (req, res) => {
            res.send("planner");
        });
    }
}
const Router = new PlannerRouter();
exports.default = Router;
