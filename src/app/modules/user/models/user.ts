export interface User {
    id?: string,
    userName: string,
    email:string,
    password:string,
    firstName: string,
    middleName: string,
    lastName: string,
    birthDate: string,
    mobileNumber: string,
    interests: string[],
    isActive: boolean,
    isAdmin: boolean
}
