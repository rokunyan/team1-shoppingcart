import { Component } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  loginForm: FormGroup;
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router){

    this.loginForm = this.fb.group({
      email: ['', [Validators.email,Validators.required]],
      password: ['', Validators.required]
    })
      
  }
  
  login() {
    let user = this.authService.isValidCred(this.loginForm.value.email, this.loginForm.value.password)
    if(!user){
      alert('Invalid email or password. Please check your details.')
    } else{
      if(user.isAdmin){
        this.router.navigateByUrl('/admin-dashboard')
      } else this.router.navigateByUrl('/dashboard')
    }
  }
}
