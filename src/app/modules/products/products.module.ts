import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDashboardComponent } from './pages/product-dashboard/product-dashboard.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { provideHttpClient } from '@angular/common/http';
import { ProductInformationComponent } from './pages/product-information/product-information.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
//import { HttpClientModule } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
@NgModule({
  declarations: [
    ProductDashboardComponent,
    ProductItemComponent,
    ProductInformationComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule,
    //HttpClientModule
  ],
  providers: [
    provideHttpClient(),
  ],
})
export class ProductsModule {}
