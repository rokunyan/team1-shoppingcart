import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsPageListComponent } from './pages/products-page-list/products-page-list.component';
import { ProductsPageFormComponent } from './pages/products-page-form/products-page-form.component';

const routes: Routes = [
  { path: '', component: ProductsPageListComponent },
  { path: 'form', component: ProductsPageFormComponent },
  { path: 'form/:id', component: ProductsPageFormComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsPageRoutingModule {}
