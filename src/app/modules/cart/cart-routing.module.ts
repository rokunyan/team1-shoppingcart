import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CartListComponent } from './pages/cart-list/cart-list.component';
import { AdminPageListComponent } from '../admin-page/pages/admin-page-list/admin-page-list.component';


const routes: Routes = [
  { path: '', component:  CartListComponent },
  { path: 'admin-page', component:  AdminPageListComponent },
]

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
export class CartRoutingModule { }
