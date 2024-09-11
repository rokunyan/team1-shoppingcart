import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../user/services/user.service';
import { Router } from '@angular/router';
import { User } from '../../../user/models/user';
import { Subscription, tap } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  forgotForm: FormGroup;
  validUsers : User[] | undefined
  sub: Subscription | undefined

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router, private loginService : LoginService, private toastr:ToastrService){
    this.forgotForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      mobileNumber: ['', Validators.required]
    })
      
  }

  ngOnInit(): void {
    this.sub = this.userService.getAllUsers().pipe(tap((x) => this.validUsers = x as User[])).subscribe()
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe
  }
  
  verify() {
    let user = this.validUsers?.find((u) => u.email === this.forgotForm.value.email && u.userName === this.forgotForm.value.userName 
    && u.mobileNumber === this.forgotForm.value.mobileNumber && u.isActive)
    if(!user){
      //alert("Attempt is invalid. Check your details.")
      this.toastr.error(`Attempt is invalid. Check your details.`, 'Attempt Failed!', {
        progressBar: true,
        timeOut: 5000
      });
    } else {
        this.loginService.setRetrievePassword(user.password),
        this.router.navigateByUrl('/login/password-retrieval')
    }
  }

}
