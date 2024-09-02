import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { PasswordPageComponent } from './components/password-page/password-page.component';

const routes: Routes = [{
  path: '',
  component: LoginPageComponent
},
{
  path: 'forgot-password',
  component: ForgotPasswordComponent
},
{
  path: 'password-retrieval',
  component: PasswordPageComponent
}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule { }
