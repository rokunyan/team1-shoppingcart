import { Component, OnDestroy, OnInit } from '@angular/core';
import { Deliveryaddress } from '../../models/deliveryaddress';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrl: './delivery-address.component.css'
})
export class DeliveryAddressComponent {

deliveryAddress : Deliveryaddress = {}
sub : Subscription | undefined
user: User
toEdit = false

constructor(private userService: UserService, private router: Router){
  this.user = this.userService.getCurrentUser()
  this.deliveryAddress = {
    addressLine1: this.user.addressLine1,
    addressLine2: this.user.addressLine2,
    city: this.user.city,
    province: this.user.province,
    zipcode: this.user.zipcode
  }
}

changeEdit = () => {
  this.toEdit = true
  console.log(this.toEdit)
  this.router.navigateByUrl("/user-profile/delivery-address")
}

}
