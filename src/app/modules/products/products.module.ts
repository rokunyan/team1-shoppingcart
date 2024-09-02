import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDashboardComponent } from './pages/product-dashboard/product-dashboard.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { provideHttpClient } from '@angular/common/http';
import { ProductInformationComponent } from './pages/product-information/product-information.component';
//import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    ProductDashboardComponent,
    ProductItemComponent,
    ProductInformationComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    //HttpClientModule
  ],
  providers: [
    provideHttpClient()
  ],
})
export class ProductsModule { }
