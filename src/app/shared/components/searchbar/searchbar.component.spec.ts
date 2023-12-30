import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbarComponent } from './searchbar.component';

describe('SearchbarComponent', () => {
  let component: SearchbarComponent;
  let fixture: ComponentFixture<SearchbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchbarComponent],
    });
    fixture = TestBed.createComponent(SearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has div with searchbar class', () => {
    const element =
      fixture.debugElement.nativeElement.querySelector('.searchbar');

    expect(element).toBeTruthy();
  });

  it('should has input tag', () => {
    const element =
      fixture.debugElement.nativeElement.querySelector('input');

    expect(element).toBeTruthy();
  });
});
