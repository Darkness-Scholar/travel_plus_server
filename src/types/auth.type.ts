export interface SignupValues {
    username: string
    email: string
    password: string
    confirmPassword: string
}

export interface SignupErrors {
    general?: string
    username?: string
    email?: string
    password?: string
    confirmPassword?: string
}

export interface SigninValues {
    email: string
    password: string
}


export interface SigninErrors {
    general?: string
    email?: string
    password?: string
}