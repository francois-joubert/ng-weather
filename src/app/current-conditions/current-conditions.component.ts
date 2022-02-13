import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WeatherService } from "../weather.service";
import { WeatherConditions } from '../types';

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
    private router: Router)
  {
    this.currentConditions$ = this.weatherService.currentConditions$;
  }

  showForecast(zipcode: string)
  {
    this.router.navigate(['/forecast', zipcode])
  }

  onRefreshNow()
  {
    this.weatherService.refreshAll();
  }
}
