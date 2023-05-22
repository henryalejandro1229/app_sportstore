import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentasComponent } from './ventas.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { PedidosComponent } from '../shared/pedidos/pedidos.component';

const routes: Routes = [
  {
    path: '',
    component: VentasComponent,
    children: [
      {
        path: 'carrito',
        data: { breadcrumb: 'Categorías' },
        component: CarritoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentasRoutingModule {}
