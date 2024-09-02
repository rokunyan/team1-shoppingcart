import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserModule } from './user.module';
// import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

const routes: Routes = [
  // { path: '', component: ProfilePageComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports :[
    RouterModule,
    UserModule
  ]
})
export class UserRoutingModule { }