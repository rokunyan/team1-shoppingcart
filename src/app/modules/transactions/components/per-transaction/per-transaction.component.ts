import { Component, Input, OnInit } from '@angular/core';
import { Transactions } from '../../models/transactions';
import { Cart } from '../../../cart/model/cart';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-per-transaction',
  templateUrl: './per-transaction.component.html',
  styleUrl: './per-transaction.component.css'
})
export class PerTransactionComponent implements OnInit {
  
  @Input(`transaction`) transaction!: Transactions;

  cartIds: string[] = []
  pendingCarts: Cart[] = []

  constructor(private cartService: CartService){
  }

  ngOnInit(): void {
    this.cartIds = this.transaction.cartIds
    this.cartIds.forEach((cartId) => this.cartService.getCartById(cartId).subscribe((data) => this.pendingCarts.push(data)))
    console.log(this.pendingCarts)
  }

}
