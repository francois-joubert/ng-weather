import { Component, ElementRef, ViewChild } from '@angular/core';
import { LocationService } from "../location.service";
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html'
})
export class ZipcodeEntryComponent
{
  @ViewChild("zipcodeInput")
  input: ElementRef<HTMLInputElement>;

  @ViewChild("button")
  button: ButtonComponent;

  countries = [
    { value: "us", label: "USA" },
    { value: "ca", label: "Canada" },
    { value: "fr", label: "France" },
    { value: "au", label: "Australia" }
  ];

  selectedCountryCode: string = "us";

  constructor(private service: LocationService) { }

  onSelectionChange(option: { value: string })
  {
    this.selectedCountryCode = option.value;
  }

  async onAddClick()
  {
    let zipcode = this.input.nativeElement.value;
    this.input.nativeElement.value = "";

    await this.service.addLocationAsync(this.selectedCountryCode, zipcode);
    this.button.state.complete();
  }
}
