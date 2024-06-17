export interface UserSignup {
    username: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    dateOfBirth: Date;
    address?: string;
}