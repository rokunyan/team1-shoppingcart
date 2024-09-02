import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductDashboardComponent } from './pages/product-dashboard/product-dashboard.component';
import { ProductInformationComponent } from './pages/product-information/product-information.component';

const routes: Routes = [{
  path: '',
  component: ProductDashboardComponent
},
{
  path: 'product/:productId',
  component: ProductInformationComponent
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
