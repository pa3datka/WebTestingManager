export interface IFormRegister {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    password_confirmation: string,
    agree: boolean,
    lang?: string,
    reCaptcha: string|undefined
}