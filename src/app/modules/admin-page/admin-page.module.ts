import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AdminPageItemComponent } from './components/admin-page-item/admin-page-item.component';
import { AdminPageListComponent } from './pages/admin-page-list/admin-page-list.component';
import { AdminPageRoutingModule } from './admin-page-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminPageFormComponent } from './pages/admin-page-form/admin-page-form.component';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    // AdminPageItemComponent,
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
