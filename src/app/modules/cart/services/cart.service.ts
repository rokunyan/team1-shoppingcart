import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private serverUrl = 'http://localhost:3000/carts';
  userId = 1;
  status = "added";

  constructor(private http: HttpClient) {}

  getCarts(): Observable<Cart[]>{
    return this.http.get<Cart[]>(this.serverUrl)
    .pipe(
      map(carts => carts.filter(
        cart => (this.userId ? cart.userId === this.userId : true) &&
        (this.status ? cart.status === this.status : true )
      )),
      tap(filteredCarts => console.log('Fetched and filtered arts:', filteredCarts))
    )
  };

  addItemToCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(this.serverUrl, cart).pipe(
      tap((newItem: Cart) => console.log('Adding item to cart ', newItem))
    )
  }

  deleteItemToCart(id: number): Observable<Cart>  {
    const url = `${this.serverUrl}/${id}`;
    return this.http.delete<Cart>(url).pipe(
      tap(() => console.log(`Deleted cart ${id}`))
    );
  }

  incrementCart(id: number): Observable<Cart> {
    const url = `${this.serverUrl}/${id}`;
    return this.http.get<Cart>(url).pipe(
      map(cart => {
        cart.price = (cart.price / cart.quantity);
        cart.quantity += 1;
        cart.price *= cart.quantity;
        return cart;
      }),
      switchMap(updateCart => this.http.patch<Cart>(url, updateCart)),
      tap((updatedCart => console.log(`Added quantity for cart ${id}`)))
    )
  }

  decrementCart(id: number): Observable<Cart> {
    const url = `${this.serverUrl}/${id}`;
    return this.http.get<Cart>(url).pipe(
      map(cart => {
        cart.price = (cart.price / cart.quantity);
        cart.quantity -= 1;

        if(cart.quantity === 0) {
          return this.deleteItemToCart(id).pipe(
            tap(() => console.log('Quantity is zero')),
            map(() => null)
          )
        }
        cart.price *= cart.quantity;
        return this.http.patch<Cart>(url, cart).pipe(
          tap(updatedCart => console.log(`Decrement quantity for cart ${id}`))
        );
      }),
      switchMap(result => result as Observable<Cart>)
    );
  }

  editQuantity(id: number, quantity: number): Observable<Cart> {
    const url = `${this.serverUrl}/${id}`;
    return this.http.get<Cart>(url).pipe(
      map(cart => {
        cart.price = (cart.price / cart.quantity);
        cart.quantity = quantity;

        if(cart.quantity === 0) {
          return this.deleteItemToCart(id).pipe(
            tap(() => console.log('Quantity is zero')),
            map(() => null)
          )
        }
        cart.price *= cart.quantity;
        return this.http.patch<Cart>(url, cart).pipe(
          tap(updatedCart => console.log(`Edit quantity for cart ${id}`))
        );
      }),
      switchMap(result => result as Observable<Cart>)
    );
  }
}
