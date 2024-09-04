import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ProductsPageRoutingModule } from './products-page-routing.module';
import { ProductsPageItemComponent } from './components/products-page-item/products-page-item.component';
import { ProductsPageListComponent } from './pages/products-page-list/products-page-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsPageFormComponent } from './pages/products-page-form/products-page-form.component';

@NgModule({
  declarations: [
    ProductsPageItemComponent,
    ProductsPageListComponent,
    ProductsPageFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductsPageRoutingModule,
    ReactiveFormsModule,
  ],
})
export class ProductsPageModule {}
