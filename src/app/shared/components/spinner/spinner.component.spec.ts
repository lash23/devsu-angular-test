import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerComponent } from './spinner.component';
import { By } from '@angular/platform-browser';
import { SpinnerService } from '../../../services/spinner.service';
import { skip } from 'rxjs';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpinnerComponent],
    });
    fixture = TestBed.createComponent(SpinnerComponent);
    service = TestBed.inject(SpinnerService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has div tag with id app-spinner', () => {
    service.spinnerObserver$.pipe(skip(1)).subscribe({
      next(_value) {
        fixture.detectChanges();
        const element =
          fixture.debugElement.nativeElement.querySelector('.spinner');

        expect(element).toBeTruthy();
      },
    });

    service.showSpinner();
  });

  it('should not has div tag with id app-spinner by default', () => {
    const element =
      fixture.debugElement.nativeElement.querySelector('.spinner');

    expect(element).toBeFalsy();
  });
});
