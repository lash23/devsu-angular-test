import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProduct } from '../interfaces/IProduct';
import {
  Observable,
  catchError,
  iif,
  map,
  mergeMap,
  of,
  tap,
  throwError,
} from 'rxjs';
import { PRODUCT_ERROR_MESSAGE } from '../constants/ProductErrorMessages.enum';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public readonly BASE_URL = `${environment.apiUrl}/bp/products`;
  private HEADERS = new HttpHeaders().set('authorID', environment.authorID);
  constructor(private http: HttpClient) {}

  public getProducts(): Observable<IProduct[]> {
    return this.http.get(this.BASE_URL, {
      headers: this.HEADERS,
    }) as Observable<IProduct[]>;
  }

  public getProduct(productId: string): Observable<IProduct> {
    return of(productId).pipe(
      mergeMap(() => this.getProducts()),
      map((products) => products.find((p) => p?.id === productId)),
      mergeMap((product) =>
        iif(
          () => !!product,
          of(product),
          throwError(() => PRODUCT_ERROR_MESSAGE.DOES_NOT_EXIST)
        )
      )
    ) as Observable<IProduct>;
  }

  public addProduct(body: IProduct): Observable<IProduct> {
    return of(body).pipe(
      mergeMap((b) => this.verifyProduct(b.id)),
      mergeMap((exist) =>
        iif(
          () => exist,
          throwError(() => PRODUCT_ERROR_MESSAGE.ALREADY_EXIST),
          this.http.post(this.BASE_URL, body, {
            headers: this.HEADERS,
          })
        )
      )
    ) as Observable<IProduct>;
  }

  public updateProduct(body: IProduct): Observable<IProduct> {
    return of(body).pipe(
      mergeMap((b) => this.verifyProduct(b.id)),
      mergeMap((exist) =>
        iif(
          () => !exist,
          throwError(() => PRODUCT_ERROR_MESSAGE.DOES_NOT_EXIST),
          this.http.put(this.BASE_URL, body, {
            headers: this.HEADERS,
          })
        )
      )
    ) as Observable<IProduct>;
  }

  public deleteProduct(productId: string): Observable<string> {
    return of(productId).pipe(
      mergeMap((id) => this.verifyProduct(id)),
      mergeMap((exist) =>
        iif(
          () => !exist,
          throwError(() => PRODUCT_ERROR_MESSAGE.DOES_NOT_EXIST),
          this.http.delete(`${this.BASE_URL}?id=${productId}`, {
            headers: this.HEADERS,
          })
        )
      ),
      catchError((err: any) => {
        if (err.status === 200) return of(productId);
        return throwError(() => err);
      })
    ) as Observable<any>;
  }

  public verifyProduct(id: string): Observable<boolean> {
    return this.http.get(`${this.BASE_URL}/verification?id=${id}`, {
      headers: this.HEADERS,
    }) as Observable<boolean>;
  }
}
