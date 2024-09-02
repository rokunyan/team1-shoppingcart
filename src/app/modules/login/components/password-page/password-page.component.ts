import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-page',
  templateUrl: './password-page.component.html',
  styleUrl: './password-page.component.css'
})
export class PasswordPageComponent implements OnInit, OnDestroy {
  
  password: any | undefined
  constructor(private loginService: LoginService, private router: Router){}

  ngOnInit(): void {
    let password = this.loginService.getRetrievePassword()
    if(password){
      this.password = password
    } else {
      this.router.navigateByUrl('login/forgot-password')
    }
  }

  ngOnDestroy(): void {
    this.loginService.setRetrievePassword(undefined)
  }
}
