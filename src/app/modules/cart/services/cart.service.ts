import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../model/cart';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient){}
  private serverUrl = 'http://localhost:3000'


  
  getCart(){
    console.log(`[From Cart Service] Getting cart with user id (user.id not implemented yet)...`)
    return this.http.get<any[]>(`${this.serverUrl}/carts`).pipe(
      map((carts) => carts.find((cart: Cart) => cart.userId === "1"))
    )
  }

  updateCart(updatedCart:Cart){
    return this.http
    .put(`${this.serverUrl}/carts/${updatedCart.id}`, updatedCart)
    .pipe(tap((x)=> console.log('[From Cart Service] updating ', x)))
  }
}
