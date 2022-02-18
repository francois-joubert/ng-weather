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
    if (locString) { this.locations = JSON.parse(locString); }

    for (let loc of this.locations)
    {
      let [countryCode, zipcode] = loc.split("|");
      this.weatherService.addCurrentConditionsAsync(countryCode, zipcode);
    }

    autoRefreshService.init(30000);
  }

  async addLocationAsync(countryCode: string, zipcode: string)
  {
    if (!zipcode)
    {
      console.warn(`Not a valid zipcode: ${zipcode}`);
      return;
    }

    this.locations.push(`${countryCode}|${zipcode}`);
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    await this.weatherService.addCurrentConditionsAsync(countryCode, zipcode);
  }

  removeLocation(countryCode: string, zipcode: string)
  {
    let index = this.locations.indexOf(`${countryCode}|${zipcode}`);
    if (index !== -1)
    {
      this.locations.splice(index, 1);
      localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
      this.weatherService.removeCurrentConditions(countryCode, zipcode);
    }
  }
}
