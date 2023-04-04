import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertyService } from "./core/services/property/property.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SearchPropertiesComponent } from './components/search-properties/search-properties.component';
import {SharedModule} from "./modules/shared/shared.module";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SpinnerComponent } from './components/spinner/spinner.component';
import {LoadingInterceptor} from "./core/interceptors/loading.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SearchPropertiesComponent,
    PageNotFoundComponent,
    SpinnerComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule
    ],
  providers: [
    Title,
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    },
    PropertyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
