import { TestBed } from '@angular/core/testing';

import { SpinnerService } from './spinner.service';
import { skip } from 'rxjs';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit a true boolean value in showSpinner method call', () => {
    service.spinnerObserver$.pipe(skip(1)).subscribe({
      next(value) {
        expect(value).toBeTrue();
      },
    });

    service.showSpinner();
  });

  it('should emit a false boolean value in hideSpinner method call', () => {
    service.spinnerObserver$.pipe(skip(1)).subscribe({
      next(value) {
        expect(value).toBeFalse();
      },
    });

    service.hideSpinner();
  });
});
