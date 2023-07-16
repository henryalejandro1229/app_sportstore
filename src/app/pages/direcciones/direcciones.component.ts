import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { showModalConfirmation, showNotifyError, showNotifySuccess } from 'src/app/shared/functions/Utilities';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NuevaDireccionComponent } from 'src/app/ventas/components/nueva-direccion/nueva-direccion.component';
import { DireccionModelo } from 'src/app/ventas/models/ventas.modelo';
import { VentasService } from 'src/app/ventas/services/ventas.service';

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.scss']
})
export class DireccionesComponent implements OnInit {

  direcciones: DireccionModelo[] = [];

  constructor(
    private _vs: VentasService,
    private matDialog: MatDialog,
    private _auth: AuthService,
    ) { }

  ngOnInit(): void {
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

  openModalDireccion(isNew: boolean, direccion?: DireccionModelo) {
    this.matDialog
      .open(NuevaDireccionComponent, {
        panelClass: 'sinpadding',
        width: '700px',
        height: 'auto',
        data: {
          isNew,
          direccion,
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) this.getDirecciones();
      });
  }

  eliminarDireccion(direccion: DireccionModelo) {
    showModalConfirmation(
      'Eliminar dirección',
      '¿Seguro que deseas eliminar esta dirección?'
    ).then((res) => {
      if (res) {
        this._vs.deleteDireccion(direccion._id.$oid).subscribe(
          (res: any) => {
            showNotifySuccess(
              'Dirección eliminada',
              'La dirección se eliminó correctamente'
            );
            this.getDirecciones();
          },
          (e) => {
            showNotifyError('Error al actualizar', 'Intente mas tarde');
          }
        );
      }
    });
  }
}
