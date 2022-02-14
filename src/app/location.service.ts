import { Injectable } from '@angular/core';
import { AutoRefreshService } from './auto-refresh.service';
import { WeatherService } from "./weather.service";

export const LOCATIONS: string = "locations";

@Injectable()
export class LocationService
{
  locations: string[] = [];

  constructor(
    private weatherService: WeatherService,
    autoRefreshService: AutoRefreshService)
  {
    let locString = localStorage.getItem(LOCATIONS);
    if (locString)
      this.locations = JSON.parse(locString);
    for (let loc of this.locations)
      this.weatherService.addCurrentConditionsAsync(loc);

    autoRefreshService.init(30000);
  }

  async addLocationAsync(zipcode: string)
  {
    if (!zipcode)
    {
      console.warn(`Not a valid zipcode: ${zipcode}`);
      return;
    }

    this.locations.push(zipcode);
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    await this.weatherService.addCurrentConditionsAsync(zipcode);
  }

  removeLocation(zipcode: string)
  {
    let index = this.locations.indexOf(zipcode);
    if (index !== -1)
    {
      this.locations.splice(index, 1);
      localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
      this.weatherService.removeCurrentConditions(zipcode);
    }
  }
}
