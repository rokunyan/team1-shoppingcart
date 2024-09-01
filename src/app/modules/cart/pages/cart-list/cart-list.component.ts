import { Component, OnInit } from '@angular/core';
import { Cart } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css'
})
export class CartListComponent implements OnInit{
  
  carts: Cart[] = [];
  
  constructor(private cartService: CartService, private router: Router) {}
  ngOnInit(): void {
    this.loadCarts()
  }

  loadCarts(): void {
    this.cartService.getCarts()
      .subscribe((carts: Cart[]) => this.carts = carts);
  }

  delete(id: number): void {
    this.cartService.deleteItemToCart(id)
      .subscribe(() => console.log(this.loadCarts()));
  }

  increment(id: number): void {
    this.cartService.incrementCart(id)
    .subscribe(updatedCart => this.loadCarts())
  }

  decrement(id: number): void {
    this.cartService.decrementCart(id)
    .subscribe(updatedCart => this.loadCarts())
  }

  edit(id: number, quantity: number): void {
    this.cartService.editQuantity(id, quantity)
    .subscribe(updatedCart => this.loadCarts())
  }

  continueShopping(): void {
    this.router.navigate(['/admin-page']);
  }

}
