import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageListComponent } from './pages/admin-page-list/admin-page-list.component';
import { AdminPageFormComponent } from './pages/admin-page-form/admin-page-form.component';
import { AdminPageRoutingModule } from './admin-page-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    AdminPageListComponent,
    AdminPageFormComponent
  ],
  imports: [
    CommonModule,
    AdminPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdminPageModule { }
