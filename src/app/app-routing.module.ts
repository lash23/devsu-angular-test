import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_URL } from './constants/AppURLs.enum';

const routes: Routes = [
  {
    path: '',
    redirectTo: APP_URL.LIST_PRODUCTS,
    pathMatch: 'full',
  },
  {
    path: APP_URL.LIST_PRODUCTS,
    loadChildren: () =>
      import('./modules/list-products/list-products.module').then(
        (m) => m.ListProductsModule
      ),
  },
  {
    path: APP_URL.ADD_PRODUCT,
    loadChildren: () =>
      import('./modules/add-product/add-product.module').then(
        (m) => m.AddProductModule
      ),
  },
  {
    path: `${APP_URL.EDIT_PRODUCT}/:id`,
    loadChildren: () =>
      import('./modules/edit-product/edit-product.module').then(
        (m) => m.EditProductModule
      ),
  },
  {
    path: '**',
    redirectTo: 'list-products',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
