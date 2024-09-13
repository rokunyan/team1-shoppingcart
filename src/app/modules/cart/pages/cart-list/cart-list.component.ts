import { Component } from '@angular/core';
import { Cart } from '../../model/cart';
import { CartService } from '../../services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css',
})
export class CartListComponent {
  carts: Cart[] = [];
  isForCheckout: boolean = false;

  constructor(private cartService: CartService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.loadCarts();
  }

  loadCarts(): void {
    this.cartService
      .getCarts()
      .subscribe((carts: Cart[]) => (this.carts = carts));
  }

  delete(id: string): void {
    const message = `Are you sure you want to delete this item from the cart?`;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cartService
          .deleteItemFromCart(id)
          .subscribe(() => console.log(this.loadCarts()));
      }
    });
  }

  increment(id: string): void {
    this.cartService
      .incrementCount(id)
      .subscribe((updatedCart) => this.loadCarts());
  }

  decrement(id: string): void {
    this.cartService
      .decrementCount(id)
      .subscribe((updatedCart) => this.loadCarts());
  }

  edit(id: string, quantity: number): void {
    this.cartService
      .editQuantity(id, quantity)
      .subscribe((updatedCart) => this.loadCarts());
  }

  showButton() {
    return (this.isForCheckout = this.cartService.forCheckOut);
  }
}
