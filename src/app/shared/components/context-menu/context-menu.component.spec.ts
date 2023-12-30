import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextMenuComponent } from './context-menu.component';

describe('ContextMenuComponent', () => {
  let component: ContextMenuComponent;
  let fixture: ComponentFixture<ContextMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContextMenuComponent],
    });
    fixture = TestBed.createComponent(ContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has div with context-menu-container class', () => {
    const element = fixture.debugElement.nativeElement.querySelector(
      '.context-menu-container'
    );

    expect(element).toBeTruthy();
  });

  it('should has div with context-menu class if showMenu property is setted to true', () => {
    component.showMenu = true;
    fixture.detectChanges();

    const element =
      fixture.debugElement.nativeElement.querySelector('.context-menu');

    expect(element).toBeTruthy();
  });
});
