"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const jwt = require("jsonwebtoken");
function authChecking(context) {
    // context = { ...headers }
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split("Bearer ")[1];
        if (token) {
            try {
                const user = jwt.verify(token, process.env.PRIVATE_KEY);
                return user;
            }
            catch (err) {
                throw new apollo_server_1.AuthenticationError("Invalid/Expired token");
            }
        }
        else {
            throw new Error("Authentication token must be <Bearer [token]>");
        }
    }
    else {
        throw new Error("Authentication header must be provided");
    }
}
exports.default = authChecking;
