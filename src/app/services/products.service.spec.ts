import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ProductsService } from './products.service';
import { IProduct } from '../interfaces/IProduct';
import { of } from 'rxjs';
import { PRODUCT_ERROR_MESSAGE } from '../constants/ProductErrorMessages.enum';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;
  let url: string;
  const mockProduct: IProduct = {
    id: '1',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: '',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
    url = service.BASE_URL;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make an http get request on getProducts method call and return products array', () => {
    const products: IProduct[] = [mockProduct];

    service.getProducts().subscribe((res) => {
      expect(res).toEqual(products);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(products);

    httpMock.verify();
  });

  it('should return a product object on getProduct method call', () => {
    const products: IProduct[] = [mockProduct];
    spyOn(service, 'getProducts').and.returnValue(of(products));

    service.getProduct(mockProduct.id).subscribe((res) => {
      expect(res).toEqual(mockProduct);
    });
  });

  it('should return an error object on getProduct method call if product does not exist', () => {
    const products: IProduct[] = [];
    spyOn(service, 'getProducts').and.returnValue(of(products));

    service.getProduct(mockProduct.id).subscribe({
      error(err) {
        expect(err).toBe(PRODUCT_ERROR_MESSAGE.DOES_NOT_EXIST);
      },
    });
  });

  it('should make an http post request on addProduct method call and return products object', () => {
    const product: IProduct = mockProduct;

    spyOn(service, 'verifyProduct').and.returnValue(of(false));

    service.addProduct(product).subscribe((res) => {
      expect(res).toEqual(product);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush(product);

    httpMock.verify();
  });

  it('should return error on addProduct method call if product already exist', () => {
    const product: IProduct = mockProduct;
    spyOn(service, 'verifyProduct').and.returnValue(of(true));

    service.addProduct(product).subscribe({
      error(err) {
        expect(err).toBe(PRODUCT_ERROR_MESSAGE.ALREADY_EXIST);
      },
    });
  });

  it('should make an http put request on updateProduct method call and return products object', () => {
    const product: IProduct = mockProduct;

    spyOn(service, 'verifyProduct').and.returnValue(of(true));

    service.updateProduct(product).subscribe((res) => {
      expect(res).toEqual(product);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toEqual('PUT');
    req.flush(product);

    httpMock.verify();
  });

  it('should return error on updateProduct method call if product does not exist', () => {
    const product: IProduct = mockProduct;
    spyOn(service, 'verifyProduct').and.returnValue(of(false));

    service.addProduct(product).subscribe({
      error(err) {
        expect(err).toBe(PRODUCT_ERROR_MESSAGE.DOES_NOT_EXIST);
      },
    });
  });

  it('should make an http delete request on deleteProduct method call and return an string', () => {
    const product: IProduct = mockProduct;

    spyOn(service, 'verifyProduct').and.returnValue(of(true));

    service.deleteProduct(product.id).subscribe((res) => {
      expect(res).toBeInstanceOf(String);
    });

    const req = httpMock.expectOne(`${url}?id=${product.id}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush('');

    httpMock.verify();
  });

  it('should return error on deleteProduct method call if product does not exist', () => {
    const product: IProduct = mockProduct;
    spyOn(service, 'verifyProduct').and.returnValue(of(false));

    service.deleteProduct(product.id).subscribe({
      error(err) {
        expect(err).toBe(PRODUCT_ERROR_MESSAGE.DOES_NOT_EXIST);
      },
    });
  });

  it('should make an http get request on verifyProduct method call and return a boolean', () => {
    const product: IProduct = mockProduct;

    service.verifyProduct(product.id).subscribe((res) => {
      expect(res).toBeTrue();
    });

    const req = httpMock.expectOne(`${url}/verification?id=${product.id}`);
    expect(req.request.method).toEqual('GET');
    req.flush(true);

    httpMock.verify();
  });
});
