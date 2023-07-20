import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteModelo } from 'src/app/login/models/cliente.modelo';
import { LoginService } from 'src/app/login/services/login.service';
import { ImagenModelo } from 'src/app/productos/models/productos.modelo';
import { ProductosService } from 'src/app/productos/services/productos.service';
import {
  showNotifyError,
  showNotifyWarning,
  showSwalSuccess,
  showSwalWarning,
} from 'src/app/shared/functions/Utilities';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-change-profile-img',
  templateUrl: './change-profile-img.component.html',
  styleUrls: ['./change-profile-img.component.scss'],
})
export class ChangeProfileImgComponent implements OnInit {
  profileUrl = '../../../assets/resources/perfilimagen.png';
  extPermitidas = ['jpg', 'jpeg', 'png'];
  objImagen: ImagenModelo = {
    nombreArchivo: '',
    base64textString: '',
  };
  objUser!: ClienteModelo;
  @ViewChild('div') editor!: ElementRef;
  @ViewChild('inputFile') inputFile!: ElementRef;
  @ViewChild('base64') base64!: ElementRef;
  constructor(
    private _ps: ProductosService,
    private _ls: LoginService,
    private _auth: AuthService,
    private router: Router
  ) {
    let token = _auth.getTokenLocalStorage();
    if (token) this.consultaInfo(token);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.setImg();
  }

  consultaInfo(id: string): void {
    this._ls.getUsuario(id).subscribe(
      (res: ClienteModelo[]) => {
        this.objUser = res[0];
        if (this.objUser.profileUrl)
          this.profileUrl = `${environment.urlImg}${this.objUser.profileUrl}`;
        this.setImg();
      },
      (e) => {
        showNotifyError('Error al consultar información', 'Intente mas tarde');
      }
    );
  }

  setImg() {
    this.editor.nativeElement.innerHTML = '';
    let cropprImg = document.createElement('img');
    cropprImg.style.width = '100%';
    cropprImg.setAttribute('id', 'croppr');
    this.editor.nativeElement.appendChild(cropprImg);
    cropprImg.setAttribute('src', this.profileUrl);
  }

  guardar() {
    if(this.objImagen.base64textString === '') {
      showNotifyWarning('', 'Cargue una imagen para continuar');
      return;
    }
    const base64 = this.base64.nativeElement.value;
    if (!base64 || base64 === '') {
      showNotifyWarning('', 'Haga click la sección de imagen a cargar');
      return;
    }
    const arr = base64.split(',');
    const nombre = new Date();
    let objImagen: ImagenModelo = {
      nombreArchivo: `${nombre.getTime()}.jpeg`,
      base64textString: arr.pop(),
    };
    const id = this._auth.getTokenLocalStorage();
    this.uploadImage(objImagen);
    this._ls.updateProfile(id ? id : '', objImagen.nombreArchivo).subscribe(
      (res) => {
        showSwalSuccess('', 'Imagen cargada correctamente');
        this._auth.profileUrl = `${environment.urlImg}${objImagen.nombreArchivo}`;
        this.navigateProfile();
      },
      (e) => showNotifyError('Error al subir imagen', 'Intente mas tarde')
    );
  }

  navigateProfile() {
    this.router.navigate(['home/profile']);
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

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
    console.log(file);
    console.log(this.objImagen);
  }

  getFileExtension(filename: string) {
    return filename.split('.').pop();
  }

  _handleReaderLoaded(readerEvent: any) {
    console.log(readerEvent);
    var binaryString = readerEvent.target.result;
    this.objImagen.base64textString = btoa(binaryString);
  }

  uploadImage(objImagen: ImagenModelo) {
    this._ps.uploadFile(objImagen).subscribe(
      (datos) => {},
      (e) => {
        showNotifyError('Error al subir imagen', 'Intente mas tarde');
      }
    );
  }
}
