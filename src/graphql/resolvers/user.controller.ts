import { signinValidator, signupValidator } from "../../helpers/validator"
import { UserInputError } from "apollo-server"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../../models/user.model"
import { Types } from "mongoose"

type AuthResponse = Promise<{id: Types.ObjectId, username: string, email: string, token: string}>

export default class UserController {
    static Mutation = {
        async signin(_: any, args: any): AuthResponse {
            const { email, password } = args
            const { errors, valid } = signinValidator({ email, password })
            if (!valid) {
                console.log(errors)
                throw new UserInputError("Fields are not valid", { errors })
            }
            const user = await User.findOne({ email })
            if (!user) {
                errors.general = "User not found"
                throw new UserInputError("Wrong credentials", { errors })
            }
            const matched = await bcrypt.compare(password, user.password)
            if (!matched) {
                errors.general = "Wrong credentials"
                throw new UserInputError("Wrong credentials", { errors })
            }

            const token = jwt
                .sign({ id: user.id, email: user.email, username: user.username },
                    process.env.PRIVATE_KEY as string,
                    { expiresIn: '1h' }
                )

            return {
                username: user.username,
                email: user.email,
                id: user._id,
                token
            }
        },

        async signup(_: any, { values: { username, email, password, confirmPassword } }: any): AuthResponse {
            const { valid, errors } = signupValidator({ username, email, password, confirmPassword })
            if (!valid) {
                console.log(errors)
                throw new UserInputError("Fields are not valid", { errors })
            }
            let hashedPassword = await bcrypt.hash(password, 12)
            const newUser = new User({ email, password: hashedPassword, username })
            console.log(newUser)
            const res = await newUser.save()

            const token = jwt
                .sign({ id: res.id, email: res.email, username: res.username },
                    process.env.PRIVATE_KEY as string,
                    { expiresIn: '1h' }
                )

            return {
                username: res.username,
                email: res.email,
                id: res._id,
                token
            }
        }
    }
}