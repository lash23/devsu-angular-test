import { Injectable } from '@angular/core';
import { ModalComponent } from '../shared/components/modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modal?: ModalComponent;

  add(modal: ModalComponent) {
    this.modal = modal;
  }

  remove() {
    this.modal = undefined;
  }

  open() {
    this.modal?.open();
  }

  close() {
    this.modal?.close();
  }
}
