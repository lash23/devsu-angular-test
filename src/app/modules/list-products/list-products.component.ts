import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../interfaces/IProduct';
import { Subject, takeUntil } from 'rxjs';
import { IActionTrigger, ITableAction } from '../../interfaces/ITable';
import { Router } from '@angular/router';
import { PRODUCT_TABLE_COLUMNS } from '../../constants/ProductsTableColumns';
import { APP_URL } from '../../constants/AppURLs.enum';
import { ModalService } from '../../services/modal.service';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit, OnDestroy {
  public products: IProduct[] = [];
  public columns = PRODUCT_TABLE_COLUMNS;
  public selectedProduct?: IProduct;

  private unsubscribeSignal: Subject<void> = new Subject();
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private modalService: ModalService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.unsubscribeServices();
  }

  public navigateToAddProduct() {
    this.router.navigateByUrl(`/${APP_URL.ADD_PRODUCT}`);
  }

  public getProducts() {
    this.spinnerService.showSpinner();

    this.productsService
      .getProducts()
      .pipe(takeUntil(this.unsubscribeSignal))
      .subscribe((res) => {
        this.products = res;

        this.spinnerService.hideSpinner();
      });
  }

  public deleteProduct() {
    if (!this.selectedProduct) return;

    this.spinnerService.showSpinner();
    this.productsService
      .deleteProduct(this.selectedProduct.id)
      .pipe(takeUntil(this.unsubscribeSignal))
      .subscribe((_res) => {
        this.closeModal();

        this.getProducts();
      });
  }

  public onActionTrigger(event: IActionTrigger) {
    const { action, item } = event;

    this.handleTableAction(action, item);
  }

  public closeModal() {
    this.modalService.close();
  }

  private handleTableAction(action: ITableAction, item: IProduct) {
    switch (action.action) {
      case 'navigate':
        this.navigateEditProduct(item);
        break;
      case 'openModal':
        this.openDeleteModal(item);
        break;
      default:
        break;
    }
  }

  private navigateEditProduct(product: IProduct) {
    this.router.navigateByUrl(`/${APP_URL.EDIT_PRODUCT}/${product.id}`);
  }

  private openDeleteModal(product: IProduct) {
    this.selectedProduct = product;
    this.modalService.open();
  }

  private unsubscribeServices() {
    this.unsubscribeSignal.next();
    this.unsubscribeSignal.unsubscribe();
  }
}
