import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './shared/header/header.component';
import { SharedModule } from './shared/shared.module';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

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
    SharedModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient() //new http client module
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
