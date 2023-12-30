import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent]
    });
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has div with custom-modal class', () => {
    const element = fixture.debugElement.nativeElement.querySelector('.custom-modal');

    expect(element).toBeTruthy();
  });

  it('should has div with custom-modal-body class', () => {
    const element = fixture.debugElement.nativeElement.querySelector('.custom-modal-body');

    expect(element).toBeTruthy();
  });
});
