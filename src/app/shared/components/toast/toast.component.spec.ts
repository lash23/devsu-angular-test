import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastComponent } from './toast.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastService } from '../../../services/toast.service';
import { TOAST_STATE } from '../../../constants/ToastState.enum';
import { skip } from 'rxjs';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToastComponent],
      imports: [BrowserAnimationsModule],
    });
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has div tag with id app-spinner', () => {
    service.showsToast$
      .asObservable()
      .pipe(skip(1))
      .subscribe({
        next(_value) {
          const element =
            fixture.debugElement.nativeElement.querySelector('.toast-body');

          expect(element).toBeTruthy();
        },
      });

    service.showToast(TOAST_STATE.SUCCESS, 'success');
  });
});
