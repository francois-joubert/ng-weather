import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent
{
  @Input() options: Option[] = [];

  @Output() selectionchange = new EventEmitter<Option>();

  displayOptions: DisplayOption[];
  inputValue: string;

  constructor() { }

  onInput()
  {
    if (!this.inputValue)
    {
      this.displayOptions = [];
      return;
    }

    let input = this.inputValue.toLowerCase();
    this.displayOptions = this.options
      .filter(o => o.label.toLowerCase().includes(input))
      .map(o => this.buildDisplayOption(o, input));
  }

  onOptionClick(option: Option)
  {
    this.inputValue = option.label;
    this.selectionchange.emit(option);
  }

  private buildDisplayOption(option: Option, input: string)
  {
    let i = option.label.toLowerCase().indexOf(input);
    return {
      ...option,
      labelS: option.label.substring(0, i),
      labelMatch: option.label.substring(i, i + input.length),
      labelE: option.label.substring(i + input.length),
    };
  }
}

export type Option = { value: string, label: string };
export type DisplayOption = Option & { labelS: string, labelMatch: string, labelE: string };
