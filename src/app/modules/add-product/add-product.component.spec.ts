import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductComponent } from './add-product.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsFormService } from '../../services/products-form.service';
import { ProductsService } from '../../services/products.service';
import { SpinnerService } from '../../services/spinner.service';
import { ToastService } from '../../services/toast.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';
import { IProduct } from '../../interfaces/IProduct';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      imports: [SharedModule, ReactiveFormsModule],
      providers: [
        Router,
        ProductsFormService,
        ProductsService,
        SpinnerService,
        ToastService,
        HttpClient,
        HttpHandler,
      ],
    });
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate back to products list on backToProductsList method call', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigateByUrl');

    component.backToProductsList();
    expect(spy).toHaveBeenCalled();
  });

  it('should call productsService, toastService and spinerService on sendForm method call', () => {
    const product: IProduct = {
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    };
    const spinnerService = TestBed.inject(SpinnerService);
    const toastService = TestBed.inject(ToastService);
    const productsService = TestBed.inject(ProductsService);
    const spyShowSpinner = spyOn(spinnerService, 'showSpinner');
    const spyHideSpinner = spyOn(spinnerService, 'hideSpinner');
    const spyShowToast = spyOn(toastService, 'showToast');
    const spyAddProduct = spyOn(productsService, 'addProduct').and.returnValue(
      of(product)
    );

    component.sendForm();

    expect(spyShowSpinner).toHaveBeenCalled();
    expect(spyHideSpinner).toHaveBeenCalled();
    expect(spyShowToast).toHaveBeenCalled();
    expect(spyAddProduct).toHaveBeenCalled();
  });
});
