import { Component } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  loginForm: FormGroup;
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private toastr: ToastrService){

    this.loginForm = this.fb.group({
      email: ['', [Validators.email,Validators.required]],
      password: ['', Validators.required]
    })
      
  }
  
  login() {
    let user = this.authService.isValidCred(this.loginForm.value.email, this.loginForm.value.password)
    if(!user){
      // alert('Invalid email or password. Please check your details.')
      this.toastr.error(`Invalid email or password. Please check your details.`, 'Failed!', {
        progressBar: true,
        timeOut: 5000
      });
    } else{
      this.toastr.success(`You Logged In!`, 'Success!', {
        progressBar: true,
        timeOut: 5000
      });
      if(user.isAdmin){
        this.router.navigateByUrl('/admin-dashboard')
      } else this.router.navigateByUrl('/dashboard')
    }
  }
}
