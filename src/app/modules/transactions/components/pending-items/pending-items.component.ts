import { Component, Input } from '@angular/core';
import { Cart } from '../../../cart/model/cart';

@Component({
  selector: 'app-pending-items',
  templateUrl: './pending-items.component.html',
  styleUrl: './pending-items.component.css'
})
export class PendingItemsComponent {
  @Input(`cart`) cart!: Cart;
  quantity: number = 0;

  ngOnInit() {
      if(this.cart) 
        this.quantity = this.cart.quantity;
  }
}
