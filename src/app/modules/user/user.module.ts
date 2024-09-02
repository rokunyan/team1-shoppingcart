import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    // ProfilePageComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    // HttpClientModule
  ]
})
export class UserModule { }