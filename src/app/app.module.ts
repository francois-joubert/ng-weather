import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ZipcodeEntryComponent } from './zipcode-entry/zipcode-entry.component';
import { CurrentConditionsComponent } from './current-conditions/current-conditions.component';
import { ButtonComponent } from './button/button.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';

import { routing } from "./app.routing";
import { ForecastsListComponent } from './forecasts-list/forecasts-list.component';
import { LocationService } from "./location.service";
import { WeatherService } from "./weather.service";
import { AutoRefreshService } from "./auto-refresh.service";

@NgModule({
  declarations: [
    AppComponent,
    ZipcodeEntryComponent,
    ForecastsListComponent,
    CurrentConditionsComponent,
    ButtonComponent,
    AutoCompleteComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    routing,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    LocationService,
    WeatherService,
    AutoRefreshService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
