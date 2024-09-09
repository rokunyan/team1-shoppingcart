import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { CommandBarComponent } from './command-bar/command-bar.component';




@NgModule({
  declarations: [
    HeaderComponent,
    CommandBarComponent,
  ],
  imports: [
    CommonModule, RouterModule
  ],
  exports:[
    HeaderComponent,
    CommandBarComponent
  ]
})
export class SharedModule { }
