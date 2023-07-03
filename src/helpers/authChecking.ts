import { AuthenticationError, Config } from "apollo-server"
import jwt = require("jsonwebtoken")

export default function authChecking(context: any) {
    // context = { ...headers }

    const auth = context.req.headers.authorization
    const refresh = context.req.headers.refresh

    if (auth) {
        const token = auth.split("Bearer ")[1]
        if (token) {
            try {
                const user = jwt.verify(token, process.env.PRIVATE_KEY as string)
                return user
            } catch (err) {
                throw new AuthenticationError("Unauthorized: Invalid/Expired token", { status: 401 })
            }
        } else {
            throw new Error("Authentication token must be <Bearer [token]>")
        }
    } else if (refresh) {
        
    } else {
        throw new Error("Authentication header must be provided")
    }
}