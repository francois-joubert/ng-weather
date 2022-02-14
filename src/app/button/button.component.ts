import { Component, Output, EventEmitter, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent
{
  @Input() @HostBinding("class") state: ButtonState = 'ready';

  @Output() buttonclick = new EventEmitter<MouseEvent>();

  constructor() { }

  settle()
  {
    this.state = 'settled';
    setTimeout(() => this.state = 'ready', 500);
  }

  onClick(e: MouseEvent)
  {
    this.buttonclick.emit(e);
    this.state = 'pending';
  }
}

export type ButtonState = 'ready' | 'pending' | 'settled';
