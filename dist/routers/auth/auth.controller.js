"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../../models/user.model");
const validator_1 = require("../../services/validator");
class Controller {
    static signin(req, res) {
        res.send(`123123`);
    }
    static signup = async (req, res) => {
        try {
            let { name, email, password } = req.body;
            let isEmail = (0, validator_1.emailValidator)(email);
            if (!isEmail)
                return res.json(400).json({ msg: 'email is not valid' });
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
