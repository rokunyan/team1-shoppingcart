import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../model/cart';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { UserService } from '../../user/services/user.service';
import { parse } from 'path';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private serverUrl = 'http://localhost:3000/carts';
  status: string = 'added';

  constructor(private http: HttpClient, private userService: UserService) {}

  getCurrentUserId = () => {
    const user = this.userService.getCurrentUser();
    if (user && user.id) {
      return user.id;
    }
    return null;
  };

  getCarts(): Observable<Cart[]> {
    const currentUserId = this.getCurrentUserId();
    if (currentUserId === null || currentUserId === '0') {
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
        console.log('Fetched and filtered carts:', filteredCarts)
      )
    );
  }

  getCartById(id: string): Observable<Cart> {
    const url = `${this.serverUrl}/${id}`;
    return this.http
      .get<Cart>(url)
      .pipe(
        tap((filteredCarts) =>
          console.log('Fetched and filtered carts:', filteredCarts)
        )
      );
  }

  getAllCarts(): Observable<Cart[]> {
    return this.http
      .get<Cart[]>(this.serverUrl)
      .pipe(
        tap((filteredCarts) => console.log('Fetched all carts:', filteredCarts))
      );
  }

  getMaxId(): Observable<number> {
    return this.getAllCarts().pipe(
      map((carts) => {
        if (carts.length === 0) return 0;
        return Math.max(...carts.map((cart) => parseInt(cart.id)));
      })
    );
  }

  getTotal(): Observable<number> {
    return this.getCarts().pipe(
      map((carts) => {
        if (carts.length === 0) return 0;
        return carts.reduce((total, cart) => total + (cart.price), 0);
      })
    );
  }

  generateNewCartId(): Observable<string> {
    return this.getMaxId().pipe(map((maxId) => (maxId + 1).toString()));
  }

  addItemToCart(newItem: Cart): Observable<Cart> {
    return this.generateNewCartId().pipe(
      switchMap((newCartId) => {
        const updatedItem = { ...newItem, id: newCartId };
        return this.getCarts().pipe(
          switchMap((carts) => {
            const existingCart = carts.find(
              (cart) =>
                cart.productId === newItem.productId && cart.status === 'added'
            );

            if (existingCart) {
              existingCart.price = existingCart.price / existingCart.quantity;
              existingCart.quantity += newItem.quantity;
              existingCart.price *= existingCart.quantity;
              return this.http
                .patch<Cart>(
                  `${this.serverUrl}/${existingCart.id}`,
                  existingCart
                )
                .pipe(
                  tap((updatedCart) =>
                    console.log('Updated cart item:', updatedCart)
                  )
                );
            } else {
              return this.http
                .post<Cart>(this.serverUrl, updatedItem)
                .pipe(
                  tap((addedCart) =>
                    console.log('Added new cart item:', addedCart)
                  )
                );
            }
          })
        );
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

  updateCart(updatedCart: Cart) {
    return this.http
      .put(`${this.serverUrl}/carts/${updatedCart.id}`, updatedCart)
      .pipe(tap((x) => console.log('[From Cart Service] updating ', x)));
  }

  getPendingCarts = () => {

    let statusPending = "pending"
    const currentUserId = this.getCurrentUserId();

    if (currentUserId === null || currentUserId === '0') {
      console.log('Pending transactions is empty');
      return of([]);
    }
    return this.http.get<Cart[]>(this.serverUrl).pipe(
      map((carts) =>
        carts.filter(
          (cart) =>
            cart.userId === currentUserId &&
            (statusPending ? cart.status === statusPending : true)
        )
      ),
      tap((filteredCarts) =>
        console.log('Fetched and filtered carts:', filteredCarts)
      )
    );

  }

  pendingStatus(id: string): Observable<Cart> {
    const url = `${this.serverUrl}/${id}`;
    return this.http.get<Cart>(url).pipe(
      map((cart) => {
        cart.status = "pending"
        return cart;
      }),
      switchMap((updateCart) => this.http.patch<Cart>(url, updateCart)),
      tap((updatedCart) => console.log(`Updated status for cart ${id}`))
    );
  }

  // incrementCount(id: string): Observable<Cart> {
  //   const url = `${this.serverUrl}/${id}`;
  //   return this.http.get<Cart>(url).pipe(
  //     map((cart) => {
  //       cart.price = cart.price / cart.quantity;
  //       cart.quantity += 1;
  //       cart.price *= cart.quantity;
  //       return cart;
  //     }),
  //     switchMap((updateCart) => this.http.patch<Cart>(url, updateCart)),
  //     tap((updatedCart) => console.log(`Added quantity for cart ${id}`))
  //   );
  // }
}
