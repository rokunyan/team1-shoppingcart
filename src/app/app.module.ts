import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { CartModule } from './modules/cart/cart.module';
import { AdminPageModule } from './modules/admin-page/admin-page.module';
import { provideToastr } from 'ngx-toastr';
import { ProductsModule } from './modules/products/products.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    CartModule,
    AdminPageModule
  ],
  providers: [
    // provideClientHydration(),
    provideHttpClient(withFetch()), //new http client module
    provideToastr(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
