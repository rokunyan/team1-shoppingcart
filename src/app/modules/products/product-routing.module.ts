import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductDashboardComponent } from './pages/product-dashboard/product-dashboard.component';

const routes: Routes = [{
  path: '',
  component: ProductDashboardComponent
}];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class ProductRoutingModule { }
