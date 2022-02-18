import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { WeatherService } from "../weather.service";
import { WeatherConditions } from '../types';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent
{
  public readonly currentConditions$: Observable<WeatherConditions[]>;

  constructor(
    private weatherService: WeatherService,
    private locationService: LocationService,
    private router: Router)
  {
    this.currentConditions$ = this.weatherService.currentConditions$;
  }

  onShowForecast(zipcode: string)
  {
    this.router.navigate(['/forecast', zipcode])
  }

  onRefreshNow()
  {
    this.weatherService.refreshAll();
  }

  onCloseClick(conditions: WeatherConditions)
  {
    this.locationService.removeLocation(conditions.countryCode, conditions.zip);
  }
}
