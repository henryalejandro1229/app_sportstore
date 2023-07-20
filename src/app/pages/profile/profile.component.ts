import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClienteModelo } from 'src/app/login/models/cliente.modelo';
import { LoginService } from 'src/app/login/services/login.service';
import { ImagenModelo } from 'src/app/productos/models/productos.modelo';
import {
  showModalConfirmation,
  showNotifyError,
  showNotifySuccess,
  showNotifyWarning,
  showSwalSuccess,
  showSwalWarning,
} from 'src/app/shared/functions/Utilities';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  esConsulta = true;
  objUser!: ClienteModelo;
  profileUrl = '../../../assets/resources/perfilimagen.png';
  existProfileImg = false;
  @ViewChild('inputFile') inputFile!: ElementRef;
  @ViewChild('imagenPrevisualizacion') imagenPrevisualizacion!: ElementRef;
  muestraCargaFoto = false;
  token = '';

  constructor(
    private router: Router,
    private _ls: LoginService,
    private _auth: AuthService,
    private matDialog: MatDialog
  ) {
    let id = _auth.getTokenLocalStorage();
    this.token = id ? id : '';
    if (this.token) this.consultaInfo();
  }

  ngOnInit(): void {}

  consultaInfo(): void {
    this._ls.getUsuario(this.token).subscribe(
      (res: ClienteModelo[]) => {
        this.objUser = res[0];
        if (this.objUser.profileUrl) {
          this.profileUrl = `${environment.urlImg}${this.objUser.profileUrl}`;
          this.existProfileImg = true;
        }
      },
      (e) => {
        showNotifyError('Error al consultar información', 'Intente mas tarde');
      }
    );
  }

  public routerLink(path: string): void {
    this.router.navigate([path]);
  }

  cambiarFoto() {
    this.muestraCargaFoto = true;
  }

  quitarFoto() {
    showModalConfirmation(
      'Quitar foto de perfil',
      '¿Está seguro de eliminar la foto de perfil?'
    ).then((res) => {
      if (res) {
        const id = this._auth.getTokenLocalStorage();
        this._ls.updateProfile(id ? id : '', '').subscribe(
          (res) => {
            showSwalSuccess('', 'Imagen retirada exitosamente');
            this.profileUrl = '../../../assets/resources/perfilimagen.png';
            this._auth.profileUrl = this.profileUrl;
            this.existProfileImg = false;
          },
          (e) => showNotifyError('Error al subir imagen', 'Intente mas tarde')
        );
      }
    });
  }

  actualizarNombre() {
    if (this.objUser.name === '') {
      showNotifyWarning('', 'El campo nombre es obligatorio');
      return;
    }
    const id = this._auth.getTokenLocalStorage();
    this._ls.updateNames(id ? id : '', this.objUser).subscribe(
      (res) => {
        showNotifySuccess('', 'Actualizado exitosamente');
        this.esConsulta = true;
        this.consultaInfo();
      },
      (e) => showNotifyError('Error al actualizar', 'Intente mas tarde')
    );
  }
}
