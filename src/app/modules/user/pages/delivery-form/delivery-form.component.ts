import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Deliveryaddress } from '../../models/deliveryaddress';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrl: './delivery-form.component.css'
})
export class DeliveryFormComponent {

  deliveryAddress : Deliveryaddress | undefined
  sub : Subscription | undefined
  deliveryForm: FormGroup
  user: User
  toEdit = false
  
  constructor(private fb: FormBuilder, private userService: UserService, private toastr:ToastrService){
    this.user = this.userService.getCurrentUser()
    this.deliveryAddress = {
      addressLine1: this.user.addressLine1,
      addressLine2: this.user.addressLine2,
      city: this.user.city,
      province: this.user.province,
      zipcode: this.user.zipcode
    }
    this.deliveryForm = this.fb.group({
      addressLine1: [this.deliveryAddress?.addressLine1, Validators.required],
      addressLine2: [this.deliveryAddress?.addressLine2],
      city: [this.deliveryAddress?.city, Validators.required],
      province: [this.deliveryAddress?.province, Validators.required],
      zipcode: [this.deliveryAddress?.zipcode, Validators.required],
    });
  }
  
  onSubmit = () => {
    let user: User = {
      id: this.user.id,
      userName: this.user.userName,
      firstName: this.user.firstName,
      middleName: this.user.middleName,
      lastName: this.user.lastName,
      birthDate: this.user.birthDate,
      password: this.user.password,
      email: this.user.email,
      mobileNumber: this.user.mobileNumber,
      isActive: this.user.isActive,
      isAdmin: this.user.isAdmin,
      interests: this.user.interests,
      addressLine1: this.deliveryForm.value.addressLine1,
      addressLine2: this.deliveryForm.value.addressLine2,
      city: this.deliveryForm.value.city,
      province: this.deliveryForm.value.province,
      zipcode: this.deliveryForm.value.zipcode
    }

    if(!this.validationChecking()){
      this.toastr.error("Please check your address details.", 'Error!', {
        progressBar: true,
        timeOut: 5000
      });
    } else {
      this.sub = this.userService.updateUser(user).pipe().subscribe(
        () =>{
          this.toastr.success("Address successfully submitted.", 'Success!', {
            progressBar: true,
            timeOut: 5000
          });
        }
      )}
  };
  
  
  validationChecking = () => {
      return (this.deliveryForm.get('addressLine1')?.errors === null && this.deliveryForm.get('city')?.errors === null
      && this.deliveryForm.get('province')?.errors === null && this.deliveryForm.get('zipcode')?.errors === null)  
  }
  
  }