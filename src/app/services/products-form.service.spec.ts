import { TestBed } from '@angular/core/testing';

import { ProductsFormService } from './products-form.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

describe('ProductsFormService', () => {
  let service: ProductsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
    });
    service = TestBed.inject(ProductsFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a Form Group instance', () => {
    const form = service.initForm();
    expect(form).toBeInstanceOf(FormGroup);
  });
});
