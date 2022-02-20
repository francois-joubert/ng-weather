import { Component, Output, EventEmitter, Input, HostBinding } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent
{
  @Input() @HostBinding("class") currentState: ButtonState = 'ready';

  @Output() buttonclick = new EventEmitter<MouseEvent>();

  state: Subject<ButtonState>;

  constructor() { }

  onClick(e: MouseEvent)
  {
    this.currentState = 'pending';
    this.buttonclick.emit(e);

    this.state = new Subject();
    this.state.subscribe(null, null, () =>
    {
      this.currentState = 'settled';
      setTimeout(() => this.currentState = 'ready', 500);
    });
  }
}

export type ButtonState = 'ready' | 'pending' | 'settled';
