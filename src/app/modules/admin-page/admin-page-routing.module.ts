import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageListComponent } from './pages/admin-page-list/admin-page-list.component';
import { AdminPageFormComponent } from './pages/admin-page-form/admin-page-form.component';
import { UserModule } from '../user/user.module';

const routes: Routes = [
  { path: '', component: AdminPageListComponent },
  { path: 'form', component: AdminPageFormComponent },
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
export class AdminPageRoutingModule { }
