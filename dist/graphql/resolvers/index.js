"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("./user.controller"));
const planner_controller_1 = __importDefault(require("./planner.controller"));
const ping = {
    Query: {
        getPing(_, args) {
            return {
                msg: "test",
                status: 0
            };
        }
    }
};
const Resolvers = {
    Query: Object.assign(Object.assign({}, ping.Query), planner_controller_1.default.Query), Mutation: Object.assign(Object.assign({}, user_controller_1.default.Mutation), planner_controller_1.default.Mutation)
};
exports.default = Resolvers;
