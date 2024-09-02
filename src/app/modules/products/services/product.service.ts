import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, find, map, Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  
  constructor(private http:HttpClient){}
  private serverUrl = 'http://localhost:3000'

  getProducts(){
    console.log(`[From Product Service] Getting products...`)
    return this.http.get(`${this.serverUrl}/products`)
  }
  
  getProduct(productId:string){
    console.log(`[From Product Service] Getting product with product id ${productId}...`)
    return this.http.get<any[]>(`${this.serverUrl}/products`).pipe(
      map((products) => products.find((product: Product) => product.id === productId))
    )
  }
}
