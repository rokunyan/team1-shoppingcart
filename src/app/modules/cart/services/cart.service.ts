import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../model/cart';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private serverUrl = 'http://localhost:3000/carts';
  userId: string = "2";
  status: string =  "added";

  constructor(private http: HttpClient) {}

  getCarts(): Observable<Cart[]>{
    if (this.userId === null || this.userId === "0") {
      console.log('Cart is empty');
      return of([]);
    }

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

  deleteItemToCart(id: string): Observable<Cart>  {
    const url = `${this.serverUrl}/${id}`;
    return this.http.delete<Cart>(url).pipe(
      tap(() => console.log(`Deleted cart ${id}`))
    );
  }

  incrementCart(id: string): Observable<Cart> {
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

  decrementCart(id: string): Observable<Cart> {
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

  editQuantity(id: string, quantity: number): Observable<Cart> {
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

   // derek's
  getCart(){
    console.log(`[From Cart Service] Getting cart with user id (user.id not implemented yet)...`)
    return this.http.get<any[]>(`${this.serverUrl}/carts`).pipe(
      map((carts) => carts.find((cart: Cart) => cart.userId === "1" ))
    )
  }

  updateCart(updatedCart:Cart){
    return this.http
    .put(`${this.serverUrl}/carts/${updatedCart.id}`, updatedCart)
    .pipe(tap((x)=> console.log('[From Cart Service] updating ', x)))
  }
}
