import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductsComponent } from './list-products.component';
import { SharedModule } from '../../shared/shared.module';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { SpinnerService } from '../../services/spinner.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ListProductsComponent', () => {
  let component: ListProductsComponent;
  let fixture: ComponentFixture<ListProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListProductsComponent],
      imports: [SharedModule],
      providers: [
        ProductsService,
        Router,
        ModalService,
        SpinnerService,
        HttpClient,
        HttpHandler,
      ],
    });
    fixture = TestBed.createComponent(ListProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
