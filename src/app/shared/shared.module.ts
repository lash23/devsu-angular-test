import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from './components/table/table.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { ButtonComponent } from './components/button/button.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { ModalComponent } from './components/modal/modal.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    TableComponent,
    SearchbarComponent,
    ButtonComponent,
    ContextMenuComponent,
    ModalComponent,
    SpinnerComponent,
    ToastComponent,
  ],
  imports: [CommonModule],
  exports: [
    LayoutComponent,
    TableComponent,
    SearchbarComponent,
    ButtonComponent,
    ContextMenuComponent,
    ModalComponent,
    SpinnerComponent,
    ToastComponent,
  ],
})
export class SharedModule {}
