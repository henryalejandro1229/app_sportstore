import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { VentasComponent } from './ventas.component';
import { VentasRoutingModule } from './ventas-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    VentasComponent,
    CarritoComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    SharedModule,
  ],
  exports: [
    CarritoComponent
  ]
})
export class VentasModule { }
