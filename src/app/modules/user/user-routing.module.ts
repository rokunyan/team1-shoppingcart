import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { DeliveryFormComponent } from './pages/delivery-form/delivery-form.component';

const routes: Routes = [{
  path: '',
  component: ProfilePageComponent
},
{
  path: 'delivery-address',
  component: DeliveryFormComponent
}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports :[
    RouterModule
  ]
})
export class UserRoutingModule { }
