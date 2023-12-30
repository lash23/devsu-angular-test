import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsFormService } from '../../services/products-form.service';
import { addYear, formatDateForInput } from '../../../utils/dateUtils';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../interfaces/IProduct';
import { catchError, first, of } from 'rxjs';
import { APP_URL } from '../../constants/AppURLs.enum';
import { SpinnerService } from '../../services/spinner.service';
import { ToastService } from '../../services/toast.service';
import { TOAST_STATE } from '../../constants/ToastState.enum';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  updateProductsForm = this.productsFormBuilder.initForm();
  productId: string | null = null;

  constructor(
    private router: Router,
    private productsFormBuilder: ProductsFormService,
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private spinnerService: SpinnerService,
    public toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot?.paramMap?.get('id');
    this.updateProductsForm.get('id')?.disable();

    this.getProduct(this.productId);
  }

  public backToProductsList() {
    this.router.navigateByUrl(`/${APP_URL.LIST_PRODUCTS}`);
  }

  public sendForm() {
    const body = this.updateProductsForm.getRawValue() as IProduct;

    this.spinnerService.showSpinner();

    this.productsService
      .updateProduct(body)
      .pipe(first())
      .subscribe({
        complete: () => {
          this.spinnerService.hideSpinner();
          this.toastService.showToast(TOAST_STATE.SUCCESS, 'Producto editado');
        },
        error: (err) => {
          this.spinnerService.hideSpinner();
          this.toastService.showToast(TOAST_STATE.ERROR, err);
        },
      });
  }

  public resetForm() {
    this.updateProductsForm.reset({
      id: this.productId,
    });
  }

  public onDateReleaseChange(event: any) {
    const date = new Date(event.target.value);
    this.updateProductsForm.get('date_revision')?.setValue(addYear(date, true));
  }

  private getProduct(productId: string | null) {
    if (!productId) return;

    this.spinnerService.showSpinner();

    this.productsService
      .getProduct(productId)
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.spinnerService.hideSpinner();

          this.updateProductsForm.patchValue({
            ...res,
            date_release: formatDateForInput(new Date(res.date_release)),
            date_revision: formatDateForInput(new Date(res.date_revision)),
          });

          console.log(this.updateProductsForm.getRawValue());
        },
        error: (err) => {
          this.spinnerService.hideSpinner();
          this.toastService.showToast(TOAST_STATE.ERROR, err);
        },
      });
  }
}
