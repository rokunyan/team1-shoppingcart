import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent{

  sub : Subscription | undefined
  user: User = {
    userName: "",
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: "",
    password: "",
    email: "",
    mobileNumber: "",
    isActive: true,
    isAdmin: false,
    interests: [""]
  }
  
  profileForm: FormGroup;
  interestFormArray: FormArray;

  constructor(private fb: FormBuilder, private userService: UserService, private toastr:ToastrService) {
    this.user = this.userService.getCurrentUser()
    this.profileForm = this.fb.group({
      userName: [this.user.userName, Validators.required],
      firstName: [this.user.firstName, Validators.required],
      middleName: this.user.middleName,
      lastName: [this.user.lastName, Validators.required],
      birthDate: [this.user.birthDate, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      interests: this.fb.array(this.user.interests),
    });
    this.interestFormArray = this.profileForm.controls['interests'] as FormArray;
  }

  onSubmit = () => {

    let user: User = {
      id: this.user.id,
      userName: this.profileForm.value.userName,
      firstName: this.profileForm.value.firstName,
      middleName: this.profileForm.value.middleName,
      lastName: this.profileForm.value.lastName,
      birthDate: this.profileForm.value.birthDate,
      password: this.user.password,
      email: this.profileForm.value.email,
      mobileNumber: this.user.mobileNumber,
      isActive: this.user.isActive,
      isAdmin: this.user.isAdmin,
      interests: this.profileForm.value.interests,
      addressLine1: this.user.addressLine1,
      addressLine2: this.user.addressLine2,
      city: this.user.city,
      province: this.user.province,
      zipcode: this.user.zipcode
    }
    if(!this.validationChecking()){
      //alert("Please check your details.")
      this.toastr.error("Please check your details.", 'Error!', {
        progressBar: true,
        timeOut: 5000
      });
    } else {//alert("User profile successfully updated."),
      this.sub = this.userService.updateUser(user).pipe().subscribe(
        () =>{
          this.toastr.success("User profile successfully updated.", 'Success!', {
            progressBar: true,
            timeOut: 5000
          });
        }
      )}
  };

  validationChecking = () => {
      console.log (this.profileForm.get('email')?.errors )
      return (this.profileForm.get('firstName')?.errors === null && this.profileForm.get('lastName')?.errors === null
      && this.profileForm.get('email')?.errors === null && this.profileForm.get('userName')?.errors === null && this.profileForm.get('birthDate')?.errors === null)  
  }


  addInterest = () => {
    this.interestFormArray.push(new FormControl(''));
  };

  deleteInterest = (index: number) => {
    this.interestFormArray.removeAt(index);
  };
}
