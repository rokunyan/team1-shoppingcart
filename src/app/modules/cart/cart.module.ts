import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartListComponent } from './pages/cart-list/cart-list.component';
import { CartRoutingModule } from './cart-routing.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    CartItemComponent,
    CartListComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule
  ]
})
export class CartModule { }
