import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { ListCategoriesComponent } from './pages/list-categories/list-categories.component';

const routes: Routes = [
  {
    path: '',
    component: ProductosComponent,
    children: [
      {
        path: ':type',
        data: { breadcrumb: 'Categorías' },
        component: ListCategoriesComponent,
      },
      {
        path: 'category/:id',
        data: { breadcrumb: 'Categoría' },
        component: ListProductsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosRoutingModule {}
