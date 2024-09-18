import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { DisplayAddressComponent } from './components/display-address/display-address.component';
import { DeliveryAddressComponent } from './pages/delivery-address/delivery-address.component';
import { DeliveryFormComponent } from './pages/delivery-form/delivery-form.component';



@NgModule({
  declarations: [
    ProfilePageComponent,
    DisplayAddressComponent,
    DeliveryAddressComponent,
    DeliveryFormComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    ToastrModule,
  ],
  exports: [
    DisplayAddressComponent,
    DeliveryAddressComponent
  ]
})
export class UserModule { }
