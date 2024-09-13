import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cart } from '../../../cart/model/cart';
import { CartService } from '../../../cart/services/cart.service';
import { Subscription } from 'rxjs';
import { Transactions } from '../../models/transactions';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-pending-transaction',
  templateUrl: './pending-transaction.component.html',
  styleUrl: './pending-transaction.component.css'
})
export class PendingTransactionComponent implements OnInit, OnDestroy {

  pendingCarts: Cart[] = []
  pendingTransactions: Transactions[] = []
  sub: Subscription | undefined 

  constructor(private cartService: CartService, private transactionService: TransactionsService){}

  ngOnInit(): void {
    this.sub = this.transactionService.getAllTransactionsByUser().subscribe((data) => this.pendingTransactions = data)
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe
  }

}
