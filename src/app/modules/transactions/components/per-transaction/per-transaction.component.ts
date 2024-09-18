import { Component, Input, OnInit } from '@angular/core';
import { Transactions } from '../../models/transactions';
import { Cart } from '../../../cart/model/cart';
import { CartService } from '../../../cart/services/cart.service';
import { Deliveryaddress } from '../../../user/models/deliveryaddress';

@Component({
  selector: 'app-per-transaction',
  templateUrl: './per-transaction.component.html',
  styleUrl: './per-transaction.component.css'
})
export class PerTransactionComponent implements OnInit {
  
  @Input(`transaction`) transaction!: Transactions;

  cartIds: string[] = []
  pendingCarts: Cart[] = []
  deliveryAddress: Deliveryaddress = {}

  constructor(private cartService: CartService){
  }

  ngOnInit(): void {
    this.cartIds = this.transaction.cartIds
    this.cartIds.forEach((cartId) => this.cartService.getCartById(cartId).subscribe((data) => this.pendingCarts.push(data)))
    this.deliveryAddress = {
      addressLine1: this.transaction.addressLine1,
      addressLine2: this.transaction.addressLine2,
      city: this.transaction.city,
      province: this.transaction.province,
      zipcode: this. transaction.zipcode
    }
    console.log(this.pendingCarts)
  }

}
