import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITableAction } from '../../../interfaces/ITable';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
})
export class ContextMenuComponent {
  @Input() actions: ITableAction[] = [];
  @Output() actionClick = new EventEmitter<ITableAction>();
  showMenu = false;

  toggleMenu(show: boolean) {
    this.showMenu = show;
  }

  onActionClick(action: ITableAction) {
    this.actionClick.emit(action);
  }
}
