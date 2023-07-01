"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class MapRouter {
    router;
    path;
    constructor() {
        this.path = "/map";
        this.router = express.Router();
        this.router.get("/", (req, res) => {
            res.send("map");
        });
    }
}
const Router = new MapRouter();
exports.default = Router;
