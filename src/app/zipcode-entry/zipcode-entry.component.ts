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

  constructor(private service: LocationService) { }

  async onAddClick()
  {
    let zipcode = this.input.nativeElement.value;
    this.input.nativeElement.value = "";

    await this.service.addLocationAsync(zipcode);
    this.button.settle();
  }
}
