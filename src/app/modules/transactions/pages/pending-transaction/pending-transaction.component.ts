import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cart } from '../../../cart/model/cart';
import { CartService } from '../../../cart/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pending-transaction',
  templateUrl: './pending-transaction.component.html',
  styleUrl: './pending-transaction.component.css'
})
export class PendingTransactionComponent implements OnInit, OnDestroy {

  pendingCarts: Cart[] = []
  sub: Subscription | undefined 

  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.sub = this.cartService.getPendingCarts().subscribe((data) => this.pendingCarts = data)
    console.log(this.pendingCarts)
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe
  }

}
