import { Component } from '@angular/core';
import { Cart } from '../../model/cart';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css'
})
export class CartListComponent {
  carts: Cart[] = [];
  continue = [
    {label: 'Continue Shopping', action: () => this.continueShopping(), type: 'danger'}
  ];

  pay = [
    {label: 'Pay', action: () => this.payment(), type: 'primary'}
  ];
  
  constructor(private cartService: CartService, private router: Router) {}
  ngOnInit(): void {
    this.loadCarts()
  }

  loadCarts(): void {
    this.cartService.getCarts()
      .subscribe((carts: Cart[]) => this.carts = carts);
  }

  delete(id: string): void {
    this.cartService.deleteItemToCart(id)
      .subscribe(() => console.log(this.loadCarts()));
  }

  increment(id: string): void {
    this.cartService.incrementCart(id)
    .subscribe(updatedCart => this.loadCarts())
  }

  decrement(id: string): void {
    this.cartService.decrementCart(id)
    .subscribe(updatedCart => this.loadCarts())
  }

  edit(id: string, quantity: number): void {
    this.cartService.editQuantity(id, quantity)
    .subscribe(updatedCart => this.loadCarts())
  }

  continueShopping(): void {
    this.router.navigate(['/admin-page']);
  }

  payment(): void {
    this.router.navigate(['/user-profile']);
  }

}

