import { TestBed, tick } from '@angular/core/testing';

import { ToastService } from './toast.service';
import { skip } from 'rxjs';
import { TOAST_STATE } from '../constants/ToastState.enum';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit a true boolean value from showsToast$ subject in showToast method call', () => {
    service.showsToast$
      .asObservable()
      .pipe(skip(1))
      .subscribe({
        next(value) {
          expect(value).toBeTrue();
        },
      });

    service.showToast(TOAST_STATE.SUCCESS, 'success');
  });

  it('should emit a message from toastMessage$ subject in showToast method call', () => {
    service.toastMessage$
      .asObservable()
      .pipe(skip(1))
      .subscribe({
        next(value) {
          expect(value).toBe('success');
        },
      });

    service.showToast(TOAST_STATE.SUCCESS, 'success');
  });

  it('should emit a toast state from toastState$ subject in showToast method call', () => {
    service.toastState$
      .asObservable()
      .pipe(skip(1))
      .subscribe({
        next(value) {
          expect(value).toBe(TOAST_STATE.SUCCESS);
        },
      });

    service.showToast(TOAST_STATE.SUCCESS, 'success');
  });

  it('should emit a false boolean value from showsToast$ subject in dismissToast method call', () => {
    service.showsToast$
      .asObservable()
      .pipe(skip(1))
      .subscribe({
        next(value) {
          expect(value).toBeFalse();
        },
      });

    service.dismissToast();
  });
});
