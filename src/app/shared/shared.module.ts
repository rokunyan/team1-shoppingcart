import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { CommandBarComponent } from './command-bar/command-bar.component';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';




@NgModule({
  declarations: [
    HeaderComponent,
    CommandBarComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule, RouterModule
  ],
  exports:[
    HeaderComponent,
    CommandBarComponent,
    ToastrModule,
  ]
})
export class SharedModule { }
