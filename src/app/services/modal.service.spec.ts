import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalService } from './modal.service';
import { ModalComponent } from '../shared/components/modal/modal.component';

describe('ModalService', () => {
  let service: ModalService;
  let component: ModalComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);
    component = TestBed.createComponent(ModalComponent).componentInstance;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('add method should set modal constant as the indicated component', () => {
    service.add(component);
    expect(service.modal).toBeInstanceOf(ModalComponent);
  });

  it('open method should call the component self open method', () => {
    spyOn(component, 'open');
    service.add(component);
    service.open();

    expect(component).toBeTruthy();
    expect(component.open).toHaveBeenCalled();
  });

  it('close method should call the component self close method', () => {
    spyOn(component, 'close');
    service.add(component);
    service.close();

    expect(component).toBeTruthy();
    expect(component.close).toHaveBeenCalled();
  });

  it('remove method should set modal constant as undefined', () => {
    service.remove();
    expect(service.modal).toBeUndefined();
  });
});
