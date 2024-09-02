import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, withFetch } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { CartModule } from './modules/cart/cart.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    CartModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()) //new http client module
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
