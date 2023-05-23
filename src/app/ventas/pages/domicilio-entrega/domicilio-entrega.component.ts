import { Component, OnInit } from '@angular/core';
import {
  AltaCarrito,
  DireccionModelo,
  ProductoCarritoModelo,
} from '../../models/ventas.modelo';
import { environment } from 'src/environments/environment';
import { VentasService } from '../../services/ventas.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NuevaDireccionComponent } from '../../components/nueva-direccion/nueva-direccion.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { showNotifyError } from 'src/app/shared/functions/Utilities';

@Component({
  selector: 'app-domicilio-entrega',
  templateUrl: './domicilio-entrega.component.html',
  styleUrls: ['./domicilio-entrega.component.scss'],
})
export class DomicilioEntregaComponent implements OnInit {
  Productos: ProductoCarritoModelo[] = [];
  direccionID = '';
  urlImage = environment.urlImg;
  altaCarrito = new AltaCarrito({});
  direcciones: DireccionModelo[] = [];

  constructor(
    private _vs: VentasService,
    private router: Router,
    private matDialog: MatDialog,
    private _auth: AuthService,
  ) {
    // this.form = new FormGroup({});
    // this.Productos = this._vs.arrProductos;
  }

  ngOnInit(): void {
    this.calculaDatosCarrito();
    this.getDirecciones();
  }

  getDirecciones() {
    this._vs.getDirecciones(this._auth.token).subscribe(
      (res: DireccionModelo[]) => {
        this.direcciones = res;
      },
      (e) => {
        showNotifyError('Error consultar las direcciones', 'Intente mas tarde');
      }
    );
  }

  calculaDatosCarrito() {
    this.altaCarrito.total = 0;
    this.Productos.forEach(
      (prod) => (this.altaCarrito.total += prod.cantidad * prod.precio)
    );
  }

  continuarCompra() {
    this.router.navigate(['/home/ventas/domicilio-entrega']);
  }

  openModalDireccion(isNew: boolean, direccion?: DireccionModelo) {
    this.matDialog
      .open(NuevaDireccionComponent, {
        panelClass: 'sinpadding',
        width: '600px',
        height: 'auto',
        data: {
          isNew,
          direccion,
        },
      })
      .afterClosed()
      .subscribe((res) => {
        // if (res) this.consultaInfo();
      });
  }
}
