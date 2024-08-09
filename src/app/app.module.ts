import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { FormsModule } from '@angular/forms';  
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoggingInterceptor } from './logging.interceptor';
import { HeadersInterceptor } from './headers.interceptor';
import { ErrorInterceptor } from './error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,      
    HttpClientModule,
  ],
  providers: [
  {
    provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi:true
  },
  {
    provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true
  },
  {
    provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
