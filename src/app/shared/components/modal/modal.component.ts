import { Component, ElementRef, Input } from '@angular/core';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() id?: string;
  isOpen = false;
  private element: any;

  constructor(private modalService: ModalService, private _el: ElementRef) {
    this.element = _el.nativeElement;
  }

  ngOnInit() {
    this.modalService.add(this);

    document.body.appendChild(this.element);

    this.element.addEventListener('click', (el: any) => {
      if (el.target.className === 'custom-modal') {
        this.close();
      }
    });
  }

  ngOnDestroy() {
    this.element.children[0].style.display = 'none';
    this.modalService.remove();
    document.body.removeChild(this.element);
    this.element.remove();
  }

  open() {
    console.log('open mmodal', this.element.children[0]);
    this.element.children[0].style.display = 'flex';
    this.isOpen = true;
  }

  close() {
    this.element.children[0].style.display = 'none';
    this.isOpen = false;
  }
}
