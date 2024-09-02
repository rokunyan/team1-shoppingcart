import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

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

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.user = this.userService.getCurrentUser()
    console.log(this.user)
    this.profileForm = this.fb.group({
      userName: this.user.userName,
      firstName: this.user.firstName,
      middleName: this.user.middleName,
      lastName: this.user.lastName,
      birthDate: this.user.birthDate,
      email: this.user.email,
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
      interests: this.profileForm.value.interests
    }
    
    this.sub = this.userService.updateUser(user).pipe().subscribe()
  };

  addInterest = () => {
    this.interestFormArray.push(new FormControl(''));
  };

  deleteInterest = (index: number) => {
    this.interestFormArray.removeAt(index);
  };
}
