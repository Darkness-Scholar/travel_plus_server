"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("../../helpers/validator");
const apollo_server_1 = require("apollo-server");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../../models/user.model"));
class UserController {
}
UserController.Mutation = {
    signin(_, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = args;
            const { errors, valid } = (0, validator_1.signinValidator)({ email, password });
            if (!valid) {
                console.log(errors);
                throw new apollo_server_1.UserInputError("Fields are not valid", { errors });
            }
            const user = yield user_model_1.default.findOne({ email });
            if (!user) {
                errors.general = "User not found";
                throw new apollo_server_1.UserInputError("Wrong credentials", { errors });
            }
            const matched = yield bcrypt_1.default.compare(password, user.password);
            if (!matched) {
                errors.general = "Wrong credentials";
                throw new apollo_server_1.UserInputError("Wrong credentials", { errors });
            }
            const token = jsonwebtoken_1.default
                .sign({ id: user.id, email: user.email, username: user.username }, process.env.PRIVATE_KEY, { expiresIn: '1h' });
            return {
                username: user.username,
                email: user.email,
                id: user._id,
                token
            };
        });
    },
    signup(_, { values: { username, email, password, confirmPassword } }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { valid, errors } = (0, validator_1.signupValidator)({ username, email, password, confirmPassword });
            if (!valid) {
                console.log(errors);
                throw new apollo_server_1.UserInputError("Fields are not valid", { errors });
            }
            let hashedPassword = yield bcrypt_1.default.hash(password, 12);
            const newUser = new user_model_1.default({ email, password: hashedPassword, username });
            console.log(newUser);
            const res = yield newUser.save();
            const token = jsonwebtoken_1.default
                .sign({ id: res.id, email: res.email, username: res.username }, process.env.PRIVATE_KEY, { expiresIn: '1h' });
            return {
                username: res.username,
                email: res.email,
                id: res._id,
                token
            };
        });
    }
};
exports.default = UserController;
