import { AuthenticationError, Config } from "apollo-server"
import jwt = require("jsonwebtoken")

export default function authChecking(context: any) {
    // context = { ...headers }
    const authHeader = context.req.headers.authorization
    if (authHeader) {
        const token = authHeader.split("Bearer ")[1]
        if (token) {
            try {
                const user = jwt.verify(token, process.env.PRIVATE_KEY as string)
                return user
            } catch (err) {
                throw new AuthenticationError("Invalid/Expired token")
            }
        } else {
            throw new Error("Authentication token must be <Bearer [token]>")
        }
    } else {
        throw new Error("Authentication header must be provided")
    }
}