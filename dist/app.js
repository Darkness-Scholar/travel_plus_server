"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const routers_1 = require("./routers");
const mongoose_1 = require("mongoose");
class App {
    app;
    routers = [routers_1.PlannerRouter, routers_1.Map, routers_1.Auth];
    constructor() {
        this.app = express();
        this.initializeDatabaseConnection();
        this.initializeMiddlewares();
        this.routers.map(item => {
            this.app.use(item.path, item.router);
        });
        this.app.get("/", (req, res) => {
            res.send(`hello world`);
        });
    }
    initializeDatabaseConnection() {
        mongoose_1.default.connect(process.env.DATABASE).then(() => {
            console.log(`success: connected to database`);
        });
    }
    initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }
    RUN() {
        this.app.listen(8888, () => {
            console.log(`server is running on port 8888`);
        });
    }
}
exports.default = App;
