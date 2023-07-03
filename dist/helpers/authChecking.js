"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const jwt = require("jsonwebtoken");
function authChecking(context) {
    // context = { ...headers }
    const auth = context.req.headers.authorization;
    const refresh = context.req.headers.refresh;
    if (auth) {
        const token = auth.split("Bearer ")[1];
        if (token) {
            try {
                const user = jwt.verify(token, process.env.PRIVATE_KEY);
                return user;
            }
            catch (err) {
                throw new apollo_server_1.AuthenticationError("Unauthorized: Invalid/Expired token", { status: 401 });
            }
        }
        else {
            throw new Error("Authentication token must be <Bearer [token]>");
        }
    }
    else if (refresh) {
    }
    else {
        throw new Error("Authentication header must be provided");
    }
}
exports.default = authChecking;
