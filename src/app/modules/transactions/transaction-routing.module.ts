import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingTransactionComponent } from './pages/pending-transaction/pending-transaction.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: PendingTransactionComponent
}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class TransactionRoutingModule { }
