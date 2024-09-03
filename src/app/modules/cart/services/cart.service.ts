import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../model/cart';
import { map, Observable, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private serverUrl = 'http://localhost:3000/carts';
  // userId: string = '1';
  status: string = 'added';

  constructor(private http: HttpClient) {}

  private getCurrentUser = () => {
    let session = localStorage.getItem('session');
    if (session) {
      return JSON.parse(session);
    }
    return null;
  };

  private getCurrentUserId = () => {
    const user = this.getCurrentUser();
    if (user && user.id) {
      return user.id;
    }
    return null;
  };

  // with getCurrentUserId
  getCarts(): Observable<Cart[]> {
    const currentUserId = this.getCurrentUserId();
    if (currentUserId === null || currentUserId === '0') {

  getCarts(): Observable<Cart[]>{
    this.userId = "1"
    if (this.userId === null || this.userId === "0") {

      console.log('Cart is empty');
      return of([]);
    }

    return this.http.get<Cart[]>(this.serverUrl).pipe(
      map((carts) =>
        carts.filter(
          (cart) =>
            cart.userId === currentUserId &&
            (this.status ? cart.status === this.status : true)
        )
      ),
      tap((filteredCarts) =>
        console.log('Fetched and filtered arts:', filteredCarts)
      )
    );
  }

  // hard-code userId
  // getCarts(): Observable<Cart[]> {
  //   if (this.userId === null || this.userId === '0') {
  //     console.log('Cart is empty');
  //     return of([]);
  //   }

  //   return this.http.get<Cart[]>(this.serverUrl).pipe(
  //     map((carts) =>
  //       carts.filter(
  //         (cart) =>
  //           (this.userId ? cart.userId === this.userId : true) &&
  //           (this.status ? cart.status === this.status : true)
  //       )
  //     ),
  //     tap((filteredCarts) =>
  //       console.log('Fetched and filtered arts:', filteredCarts)
  //     )
  //   );
  // }

  addItemToCart(newItem: Cart): Observable<Cart> {
    return this.getCart().pipe(
      switchMap((carts) => {
        const existingCart = carts.find(
          (cart: Cart) => cart.productId === newItem.productId
        );

        if (existingCart) {
          existingCart.quantity += newItem.quantity;
          existingCart.price =
            (existingCart.price / existingCart.quantity) *
            existingCart.quantity;
          return this.http
            .put<Cart>(`${this.serverUrl}/${existingCart.id}`, existingCart)
            .pipe(
              tap((updatedCart) =>
                console.log('Updated cart item:', updatedCart)
              )
            );
        } else {
          return this.http
            .post<Cart>(this.serverUrl, newItem)
            .pipe(
              tap((addedCart) => console.log('Added new cart item:', addedCart))
            );
        }
      })
    );
  }

  deleteItemFromCart(id: string): Observable<Cart> {
    const url = `${this.serverUrl}/${id}`;
    return this.http
      .delete<Cart>(url)
      .pipe(tap(() => console.log(`Deleted cart ${id}`)));
  }

  incrementCount(id: string): Observable<Cart> {
    const url = `${this.serverUrl}/${id}`;
    return this.http.get<Cart>(url).pipe(
      map((cart) => {
        cart.price = cart.price / cart.quantity;
        cart.quantity += 1;
        cart.price *= cart.quantity;
        return cart;
      }),
      switchMap((updateCart) => this.http.patch<Cart>(url, updateCart)),
      tap((updatedCart) => console.log(`Added quantity for cart ${id}`))
    );
  }

  decrementCount(id: string): Observable<Cart> {
    const url = `${this.serverUrl}/${id}`;
    return this.http.get<Cart>(url).pipe(
      map((cart) => {
        cart.price = cart.price / cart.quantity;
        cart.quantity -= 1;

        if (cart.quantity === 0) {
          return this.deleteItemFromCart(id).pipe(
            tap(() => console.log('Quantity is zero')),
            map(() => null)
          );
        }
        cart.price *= cart.quantity;
        return this.http
          .patch<Cart>(url, cart)
          .pipe(
            tap((updatedCart) =>
              console.log(`Decrement quantity for cart ${id}`)
            )
          );
      }),
      switchMap((result) => result as Observable<Cart>)
    );
  }

  editQuantity(id: string, quantity: number): Observable<Cart> {
    const url = `${this.serverUrl}/${id}`;
    return this.http.get<Cart>(url).pipe(
      map((cart) => {
        cart.price = cart.price / cart.quantity;
        cart.quantity = quantity;

        if (cart.quantity === 0) {
          return this.deleteItemFromCart(id).pipe(
            tap(() => console.log('Quantity is zero')),
            map(() => null)
          );
        }
        cart.price *= cart.quantity;
        return this.http
          .patch<Cart>(url, cart)
          .pipe(
            tap((updatedCart) => console.log(`Edit quantity for cart ${id}`))
          );
      }),
      switchMap((result) => result as Observable<Cart>)
    );
  }


   // derek's
  getCart(){
  console.log(`[From Cart Service] Getting cart with user id (user.id not implemented yet)...`)
  return this.http.get<any[]>(`${this.serverUrl}/carts`).pipe(
   map((carts) => carts.find((cart: Cart) => cart.userId === "1" ))
   )
  }


  updateCart(updatedCart: Cart) {
    return this.http
      .put(`${this.serverUrl}/carts/${updatedCart.id}`, updatedCart)
      .pipe(tap((x) => console.log('[From Cart Service] updating ', x)));
  }
}
