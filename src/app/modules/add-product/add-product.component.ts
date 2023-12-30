import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { addYear } from '../../../utils/dateUtils';
import { ProductsFormService } from '../../services/products-form.service';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../interfaces/IProduct';
import { first } from 'rxjs';
import { APP_URL } from '../../constants/AppURLs.enum';
import { SpinnerService } from '../../services/spinner.service';
import { ToastService } from '../../services/toast.service';
import { TOAST_STATE } from '../../constants/ToastState.enum';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  productsForm = this.productsFormBuilder.initForm();

  constructor(
    private router: Router,
    private productsFormBuilder: ProductsFormService,
    private productsService: ProductsService,
    private spinnerService: SpinnerService,
    public toastService: ToastService
  ) {}

  public backToProductsList() {
    this.router.navigateByUrl(`/${APP_URL.LIST_PRODUCTS}`);
  }

  public sendForm() {
    const body = this.productsForm.getRawValue() as IProduct;

    this.spinnerService.showSpinner();

    this.productsService
      .addProduct(body)
      .pipe(first())
      .subscribe({
        complete: () => {
          this.spinnerService.hideSpinner();
          this.toastService.showToast(TOAST_STATE.SUCCESS, 'Producto agregado');
        },
        error: (err) => {
          this.spinnerService.hideSpinner();
          this.toastService.showToast(TOAST_STATE.ERROR, err);
        },
      });
  }

  public resetForm() {
    this.productsForm.reset();
  }

  public onDateReleaseChange(event: any) {
    const date = new Date(event.target.value);
    this.productsForm.get('date_revision')?.setValue(addYear(date, true));
  }
}
