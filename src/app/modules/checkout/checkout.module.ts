import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutListComponent } from './pages/checkout-list/checkout-list.component';
import { CheckoutItemsComponent } from './components/checkout-items/checkout-items.component';
import { SharedModule } from '../../shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { DisplayAddressComponent } from '../user/components/display-address/display-address.component';
import { UserModule } from '../user/user.module';


@NgModule({
  declarations: [
    CheckoutListComponent,
    CheckoutItemsComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule,
    ToastrModule,
    UserModule
  ]
})
export class CheckoutModule { }
