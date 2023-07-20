import { Injectable } from '@angular/core';
import { ClienteModelo } from 'src/app/login/models/cliente.modelo';
import { LoginService } from 'src/app/login/services/login.service';
import { environment } from 'src/environments/environment';
import { showNotifyError } from '../functions/Utilities';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string = '';
  profileUrl = '../../../assets/resources/perfilimagen.png';
  constructor(private _ls: LoginService) {
    let id = this.getTokenLocalStorage();
    this.token = id ? id : '';
    if (this.token) this.consultaInfo();
  }

  consultaInfo(): void {
    this._ls.getUsuario(this.token).subscribe(
      (res: ClienteModelo[]) => {
        const objUser = <ClienteModelo>res[0];
        if (objUser.profileUrl) this.profileUrl = `${environment.urlImg}${objUser.profileUrl}`;
      },
      (e) => {
        showNotifyError('Error al consultar información', 'Intente mas tarde');
      }
    );
  }

  getCookies() {
    return localStorage.getItem('cookies');
  }

  setAceptaCookies() {
    return localStorage.setItem('cookies', 'true');
  }

  isCookiesAccept(): boolean {
    let cookie = this.getCookies();
    if (cookie && cookie?.length > 0) {
      return true;
    }
    return false;
  }

  getTokenLocalStorage() {
    return localStorage.getItem('token') ? localStorage.getItem('token') : '';
  }

  setTokenLocalStorage(token: string) {
    return localStorage.setItem('token', token);
  }

  setIsAdminLS(value: string) {
    return localStorage.setItem('isAdmin', value);
  }

  getIsAdminLS() {
    return localStorage.getItem('isAdmin');
  }

  isAuth(): boolean {
    let token = this.getTokenLocalStorage();
    if (token && token?.length > 0) {
      this.token = token;
      return true;
    }
    return false;
  }

  isAdmin(): boolean {
    let isAdmin = this.getIsAdminLS();
    if (isAdmin && isAdmin === 'true') {
      return true;
    }
    return false;
  }

  logout() {
    return localStorage.removeItem('token');
  }
}
