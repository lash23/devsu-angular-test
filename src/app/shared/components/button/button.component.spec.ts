import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    });
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;

    component.color = 'main';
    component.disabled = false;
    component.text = 'click';
    component.type = 'button';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set text input property', () => {
    const element = fixture.debugElement.nativeElement.querySelector('strong');

    expect(element.textContent).toBe(component.text);
  });

  it('should set color input property', () => {
    const element = fixture.debugElement.query(By.css('.main-button'));

    expect(element).toBeTruthy();
  });

  it('should set type input property', () => {
    const element = fixture.debugElement.query(By.css("button[type='button']"));

    expect(element).toBeTruthy();
  });

  it('should set disabled input property', () => {
    const element = fixture.debugElement.query(By.css("button[disabled='true']"));

    expect(element).toBeNull();
  });
});
