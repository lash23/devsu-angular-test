import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TOAST_STATE } from '../constants/ToastState.enum';
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public showsToast$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public toastMessage$: BehaviorSubject<string> = new BehaviorSubject<string>(
    'Default Toast Message'
  );

  public toastState$: BehaviorSubject<string> = new BehaviorSubject<string>(
    TOAST_STATE.SUCCESS
  );

  constructor() {}

  showToast(toastState: string, toastMsg: string): void {
    this.toastState$.next(toastState);
    this.toastMessage$.next(toastMsg);
    this.showsToast$.next(true);

    setTimeout(() => {
      this.showsToast$.next(false);
    }, 2000);
  }

  dismissToast(): void {
    this.showsToast$.next(false);
  }
}
