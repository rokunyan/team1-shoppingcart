import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingTransactionComponent } from './pages/pending-transaction/pending-transaction.component';
import { TransactionRoutingModule } from './transaction-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PendingItemsComponent } from './components/pending-items/pending-items.component';



@NgModule({
  declarations: [
    PendingTransactionComponent,
    PendingItemsComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    SharedModule
  ]
})
export class TransactionsModule { }
