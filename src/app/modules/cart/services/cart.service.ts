import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../model/cart';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { UserService } from '../../user/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { Product } from '../../products/models/product';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private serverUrl = 'http://localhost:3000/carts';
  private productServerUrl = 'http://localhost:3000/products';
  private totalQtySubject = new BehaviorSubject<number>(0);
  totalQty$ = this.totalQtySubject.asObservable();
  status: string = 'added';
  forCheckOut: boolean = true;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

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

    return this.http.get<Product[]>(this.productServerUrl).pipe(
      switchMap((products) => {
        return this.http.get<Cart[]>(this.serverUrl).pipe(
          map((carts) =>
            carts.filter(
              (cart) =>
                cart.userId === currentUserId &&
                (this.status ? cart.status === this.status : true)
            )
          ),
          switchMap((filteredCarts) => {
            const productMap = new Map(products.map((p) => [p.id, p]));
            const updatedCarts = filteredCarts.map((cart) => {
              const product = productMap.get(cart.productId);
              if (product && cart.quantity > product.quantity) {
                this.toastr.error(
                  `Quantity exceeds product's stock (${product.name}'s stock: ${product.quantity})`,
                  'Error Updating Item Quantity!',
                  {
                    progressBar: true,
                    timeOut: 5000,
                  }
                );
                return { ...cart, quantity: product.quantity };
              }
              return cart;
            });
            const totalQty = updatedCarts.reduce(
              (quantity, cart) => quantity + cart.quantity,
              0
            );
            console.log('Total quantity:', totalQty);
            this.totalQtySubject.next(totalQty);

            return of(updatedCarts);
          }),
          tap((filteredCarts) => {
            console.log('Fetched and filtered carts:', filteredCarts);
          })
        );
      })
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
        return carts.reduce((total, cart) => total + cart.price, 0);
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
      switchMap((cart) => {
        const productUrl = `${this.productServerUrl}/${cart.productId}`;

        return this.http.get<Product>(productUrl).pipe(
          map((product) => {
            if (cart.quantity + 1 > product.quantity) {
              this.toastr.error(
                `Quantity exceeds product's stock (${product.name}'s stock: ${product.quantity})`,
                'Error Updating Item Quantity!',
                {
                  progressBar: true,
                  timeOut: 5000,
                }
              );
              throw new Error('Exceeds available product stock');
            }

            this.forCheckOut = true;
            const updatedCart = { ...cart };
            updatedCart.quantity += 1;
            updatedCart.price =
              (cart.price / cart.quantity) * updatedCart.quantity;

            return updatedCart;
          }),
          switchMap((updatedCart) => this.http.patch<Cart>(url, updatedCart)),
          tap(() => console.log(`Added quantity for cart ${id}`))
        );
      })
      // catchError((error) => {
      //   console.error('Error updating cart quantity:', error);
      //   alert('Exceeds product stock.');
      //   return throwError(() => error);
      // })
    );
  }

  decrementCount(id: string): Observable<Cart> {
    const url = `${this.serverUrl}/${id}`;
    return this.http.get<Cart>(url).pipe(
      map((cart) => {
        cart.price = cart.price / cart.quantity;
        cart.quantity -= 1;

        if (cart.quantity === 0) {
          const message = `Are you sure you want to delete this item from the cart?`;

          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: { message },
          });

          return dialogRef.afterClosed().pipe(
            switchMap((result) => {
              if (result) {
                return this.deleteItemFromCart(id).pipe(
                  tap(() => console.log('Item deleted')),
                  map(() => null)
                );
              } else {
                return of(cart);
              }
            })
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
    quantity = Math.floor(quantity);

    return this.http.get<Cart>(url).pipe(
      switchMap((cart) => {
        const productUrl = `${this.productServerUrl}/${cart.productId}`;

        return this.http.get<Product>(productUrl).pipe(
          map((product) => {
            if (quantity > product.quantity) {
              this.forCheckOut = false;
              this.toastr.error(
                `Quantity exceeds product's stock (${product.name}'s stock: ${product.quantity})`,
                'Error Updating Item Quantity!',
                {
                  progressBar: true,
                  timeOut: 5000,
                }
              );
              throw new Error('Exceeds available product stock.');
            }

            if (quantity < 0) {
              this.forCheckOut = false;
              quantity = 1;
              this.toastr.error(
                `Quantity must be greater than 0`,
                'Error Updating Item Quantity!',
                {
                  progressBar: true,
                  timeOut: 5000,
                }
              );
              throw new Error('Quantity must be greater than zero.');
            }

            if (quantity === 0) {
              this.forCheckOut = false;
              const message = `Are you sure you want to delete this item from the cart?`;
              const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                data: { message },
              });

              return dialogRef.afterClosed().pipe(
                switchMap((result) => {
                  if (result) {
                    return this.deleteItemFromCart(id).pipe(
                      tap(() => console.log('Item deleted')),
                      map(() => null)
                    );
                  } else {
                    return of(cart);
                  }
                })
              );
            }

            this.forCheckOut = true;

            const updatedCart = { ...cart };

            updatedCart.quantity = quantity;

            updatedCart.price =
              (cart.price / cart.quantity) * updatedCart.quantity;

            return updatedCart;
          }),
          switchMap((updatedCart) =>
            this.http
              .patch<Cart>(url, updatedCart)
              .pipe(tap(() => console.log(`Edited quantity for cart ${id}`)))
          )
        );
      })
      // catchError((error) => {
      //   console.error('Error updating cart quantity:', error);
      //   alert(`Please enter a valid value.`);
      //   return throwError(() => error);
      // })
    );
  }

  updateCart(updatedCart: Cart) {
    return this.http
      .put(`${this.serverUrl}/carts/${updatedCart.id}`, updatedCart)
      .pipe(tap((x) => console.log('[From Cart Service] updating ', x)));
  }

  getPendingCarts = () => {
    let statusPending = 'pending';
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
  };

  pendingStatus(id: string): Observable<Cart> {
    const url = `${this.serverUrl}/${id}`;
    return this.http.get<Cart>(url).pipe(
      map((cart) => {
        cart.status = 'pending';
        return cart;
      }),
      switchMap((updatedCart) => this.http.patch<Cart>(url, updatedCart)),
      tap((updatedCart) => console.log(`Updated status for cart ${id}`))
    );
  }
}
