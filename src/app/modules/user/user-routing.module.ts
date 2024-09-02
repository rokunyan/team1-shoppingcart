import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from './user.module';
// import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

// const routes: Routes = [{
//   path: '',
//   component: ProfilePageComponent
// }
// ];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // RouterModule.forChild(routes)
  ],
  exports: [
    UserModule
  ]
})
export class UserRoutingModule { }
