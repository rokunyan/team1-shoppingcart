import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingTransactionComponent } from './pages/pending-transaction/pending-transaction.component';
import { TransactionRoutingModule } from './transaction-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PendingItemsComponent } from './components/pending-items/pending-items.component';
import { PerTransactionComponent } from './components/per-transaction/per-transaction.component';
import { UserModule } from '../user/user.module';



@NgModule({
  declarations: [
    PendingTransactionComponent,
    PendingItemsComponent,
    PerTransactionComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    SharedModule,
    UserModule
  ]
})
export class TransactionsModule { }
