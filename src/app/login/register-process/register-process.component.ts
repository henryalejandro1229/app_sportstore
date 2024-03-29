import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  showNotifyError,
  showNotifySuccess,
  showNotifyWarning,
  showSwalWarning,
} from 'src/app/shared/functions/Utilities';
import { LoginService } from '../services/login.service';
import { ClienteModelo } from '../models/cliente.modelo';
import { SwPush } from '@angular/service-worker';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-register-process',
  templateUrl: './register-process.component.html',
  styleUrls: ['./register-process.component.scss'],
})
export class RegisterProcessComponent implements OnInit {
  form: FormGroup;
  clear: boolean = false;
  clearConfirm: boolean = false;
  objCliente!: ClienteModelo;
  pwdsCoinciden = false;
  pwdsValue = false;
  loading = false;

  constructor(
    private activatedRouter: ActivatedRoute,
    private _ls: LoginService,
    private readonly _router: Router,
    private swPush: SwPush,
    private _ns: NotificationsService
  ) {
    this.form = new FormGroup({
      terms: new FormControl(null, [Validators.requiredTrue]),
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-z\s\u00E0-\u00FC\u00f1]*$/i),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-zd$@$!%*?&].{7,}'
        ),
      ]),
      password2: new FormControl('', [Validators.required]),
    });
    this.activatedRouter.queryParams.subscribe((param) => {
      let id: string = param['id'];
      if (!id) {
        showNotifyError('Acceso denegado', 'Ruta no válida');
        this._router.navigate(['/home/login']);
        return;
      }
      this.consultaInfo(id);
    });
  }

  ngOnInit(): void {}

  consultaInfo(id: string): void {
    this.loading = true;
    this._ls.getUsuario(id).subscribe(
      (res: ClienteModelo[]) => {
        this.loading = false;
        if (!res[0]._id) {
          showNotifyError('Acceso denegado', 'Ruta no válida');
          this._router.navigate(['/home']);
          return;
        }
        this.objCliente = res[0];
      },
      (e) => {
        this.loading = false;
        showNotifyError('Error al consultar información', 'Intente mas tarde');
      }
    );
  }

  register(): void {
    if (this.form.valid && this.pwdsCoinciden) {
      this.loading = true;
      let id: string = this.objCliente._id.$oid;
      this._ls
        .singupAll(id, this.form.value.name, this.form.value.password)
        .subscribe(
          (res) => {
            this.loading = false;
            showNotifySuccess('Registro completado', '¡Su cuenta está lista!');
            this.swPush.subscription.subscribe((sub) => {
              this._ns.sendNotification(sub, 'bienvenida').subscribe();
            });
            setTimeout(() => {
              this._router.navigate(['/home']);
            }, 3000);
          },
          (e) => {
            this.loading = false;
            showNotifyError('Error al registrar', 'Intente mas tarde');
          }
        );
      return;
    }
    showNotifyWarning(
      'Datos incompletos',
      'Complete los datos del formulario para continuar'
    );
  }

  validaPwds(): void {
    if (this.form.value.password && this.form.value.password2) {
      this.pwdsValue = true;
      this.pwdsCoinciden =
        this.form.value.password === this.form.value.password2;
      return;
    }
    this.pwdsCoinciden = false;
    this.pwdsValue = false;
  }
}
