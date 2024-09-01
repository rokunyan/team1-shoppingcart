export interface User {
    id: number,
    username: string,
    firstName: string,
    middleName: string | null,
    lastName: string,
    birthDate: Date | null,
    interests: string[] | null,
    password: string,
    email: string,
    mobileNumber: string,
    isActive: boolean,
    isAdmin: boolean
}
