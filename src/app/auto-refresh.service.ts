import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { WeatherService } from './weather.service';

@Injectable()
export class AutoRefreshService
{
  constructor(private weatherService: WeatherService) { }

  init(intervalMs: number)
  {
    interval(intervalMs).subscribe(() => this.weatherService.refreshAll());
  }
}
