import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has div with header class', () => {
    const element = fixture.debugElement.nativeElement.querySelector('.header');

    expect(element).toBeTruthy();
  });

  it('should has an img tag', () => {
    const element = fixture.debugElement.nativeElement.querySelector('img');

    expect(element).toBeTruthy();
  });
});
