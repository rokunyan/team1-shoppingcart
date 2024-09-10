import { Component, Input } from '@angular/core';
import { Cart } from '../../../cart/model/cart';

@Component({
  selector: 'app-checkout-items',
  templateUrl: './checkout-items.component.html',
  styleUrl: './checkout-items.component.css'
})
export class CheckoutItemsComponent {
  @Input(`cart`) cart!: Cart;
  quantity: number = 0;

  ngOnInit() {
      if(this.cart) 
        this.quantity = this.cart.quantity;
  }
}
