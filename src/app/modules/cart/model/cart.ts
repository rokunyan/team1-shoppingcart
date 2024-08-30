import { Product } from "../../products/models/product";

export interface Cart {
    id:string,
    userId:string,
    products:Product[]
}
