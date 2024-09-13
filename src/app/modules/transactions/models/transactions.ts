export interface Transactions {
    id?: string,
    cartIds: string[] | [],
    userId: string,
    dateOfTransaction: string,
    totalTransaction: number,
    addressLine1?: string,
    addressLine2?: string, 
    city?: string,
    province?:string,
    zipcode?: string
}
