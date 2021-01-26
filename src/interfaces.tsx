export interface Values {
    email: string,
    password: string
}

export interface FormData {
    values: Values,
    errors: Values,
    isValid: boolean,
    isSubmittted: boolean
}