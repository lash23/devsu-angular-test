import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { HeaderComponent } from '../header/header.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutComponent, HeaderComponent],
    });
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has div with main-container class', () => {
    const element =
      fixture.debugElement.nativeElement.querySelector('.main-container');

    expect(element).toBeTruthy();
  });

  it('should has an app-header tag', () => {
    const element =
      fixture.debugElement.nativeElement.querySelector('app-header');

    expect(element).toBeTruthy();
  });
});
