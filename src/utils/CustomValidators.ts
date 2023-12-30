import { AbstractControl } from '@angular/forms';
import { removeTimeZone } from './dateUtils';

export class CustomValidators {
  static dateFromTodayOn(control: AbstractControl<Date>) {
    if (!control.value) {
      return {
        dateFromTodayOn: false,
      };
    }

    const date = removeTimeZone(new Date(control.value));
    const today = removeTimeZone(new Date());

    const todayTimestamp = today.getTime();
    const dateTimeStamp = date.getTime();

    const isValid = dateTimeStamp >= todayTimestamp;

    if (isValid) {
      return null;
    }

    return {
      dateFromTodayOn: false,
    };
  }
}
