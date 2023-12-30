import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { addYear, currentDate } from '../../utils/dateUtils';
import { CustomValidators } from '../../utils/CustomValidators';

@Injectable({
  providedIn: 'root'
})
export class ProductsFormService {

  constructor(private fb: FormBuilder) { }

  public initForm() {
    return this.fb.group({
      id: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
      ],
      name: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      logo: ['', [Validators.required]],
      date_release: [
        currentDate(true),
        [Validators.required, CustomValidators.dateFromTodayOn],
      ],
      date_revision: [
        {
          value: addYear(currentDate() as Date, true),
          disabled: true,
        },
        [Validators.required],
      ],
    });
  }
}
