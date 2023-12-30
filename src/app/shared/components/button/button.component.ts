import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() disabled = false;
  @Input() text = 'click';
  @Input() color: 'main' | 'seccondary' | '' = '';
  @Input() type: 'button' | 'submit' = 'button';
}
