"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../../models/user.model");
class Controller {
    static signin(req, res) {
        res.send(`123123`);
    }
    static signup = async (req, res) => {
        try {
            let { name, email, password } = req.body;
            let newUser = await user_model_1.default.create({ name, email, password });
            res.status(200).json("success: created new user");
        }
        catch (err) {
            console.log(err);
            console.log("error: cannot create new user");
            res.status(500).json("error: cannot create new user");
        }
    };
}
exports.default = Controller;
