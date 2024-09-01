import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartListComponent } from './pages/cart-list/cart-list.component';
import { CartRoutingModule } from './cart-routing.module';


@NgModule({
  declarations: [
    CartItemComponent,
    CartListComponent,
  ],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
