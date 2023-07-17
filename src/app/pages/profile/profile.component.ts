import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClienteModelo } from 'src/app/login/models/cliente.modelo';
import { LoginService } from 'src/app/login/services/login.service';
import { ImagenModelo } from 'src/app/productos/models/productos.modelo';
import { showNotifyError, showSwalWarning } from 'src/app/shared/functions/Utilities';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  objUser!: ClienteModelo;
  profileUrl = '../../../assets/resources/perfilimagen.png';
  extPermitidas = ['jpg', 'jpeg', 'png'];
  objImagen: ImagenModelo = {
    nombreArchivo: '',
    base64textString: '',
  };
  @ViewChild('inputFile') inputFile!: ElementRef;
  @ViewChild('imagenPrevisualizacion') imagenPrevisualizacion!: ElementRef;
  muestraCargaFoto = false;

  constructor(private router: Router, private _ls: LoginService, private _auth: AuthService, private matDialog: MatDialog) {
    let token = _auth.getTokenLocalStorage();
    if(token) this.consultaInfo(token);
  }

  ngOnInit(): void {
  }

  consultaInfo(id: string): void {
    this._ls.getUsuario(id).subscribe(
      (res: ClienteModelo[]) => {
        this.objUser = res[0];
        if(this.objUser.profileUrl) this.profileUrl = this.objUser.profileUrl;
      },
      (e) => {
        showNotifyError('Error al consultar información', 'Intente mas tarde');
      }
    );
  }

  getFileExtension(filename: string) {
    return filename.split('.').pop();
  }

  seleccionarImagen(event: any) {
    const files = event.target.files;
    const file = files[0];
    const ext = this.getFileExtension(file.name);
    if (ext && !this.extPermitidas.includes(ext)) {
      showSwalWarning(
        'Formato de archivo no valido',
        'Solo se admiten archivos .jpg, .jpeg, .png'
      );
      this.inputFile.nativeElement.value = '';
      return;
    }
    this.objImagen.nombreArchivo = file.name;
    const objectURL = URL.createObjectURL(file);
    this.imagenPrevisualizacion.nativeElement.src = objectURL;

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvent: any) {
    var binaryString = readerEvent.target.result;
    this.objImagen.base64textString = btoa(binaryString);
  }

  public routerLink(path: string): void {
    this.router.navigate([path]);
  }

  cambiarFoto() {
    this.muestraCargaFoto = true;
  }
}
