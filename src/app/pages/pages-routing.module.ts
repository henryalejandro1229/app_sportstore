import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from '../login/login/login.component';
import { RegisterComponent } from '../login/register/register.component';
import { ForgotPwdComponent } from '../login/forgot-pwd/forgot-pwd.component';
import { RegisterProcessComponent } from '../login/register-process/register-process.component';
import { ResetPasswordComponent } from '../login/reset-password/reset-password.component';
import { MisionVisionComponent } from '../shared/mision-vision/mision-vision.component';
import { AvisoPrivacidadComponent } from '../shared/aviso-privacidad/aviso-privacidad.component';
import { PedidosComponent } from '../shared/pedidos/pedidos.component';
import { PreguntasFrecuentesComponent } from '../shared/preguntas-frecuentes/preguntas-frecuentes.component';
import { ResultadosBusquedaComponent } from '../productos/pages/resultados-busqueda/resultados-busqueda.component';
import { ProfileComponent } from './profile/profile.component';
import { DireccionesComponent } from './direcciones/direcciones.component';
import { ChangeProfileImgComponent } from './change-profile-img/change-profile-img.component';
import { TerminosCondicionesComponent } from '../shared/terminos-condiciones/terminos-condiciones.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'login',
        data: { breadcrumb: 'Inicio de sesión' },
        component: LoginComponent,
      },
      {
        path: 'singup',
        data: { breadcrumb: 'Registro' },
        component: RegisterComponent,
      },
      {
        path: 'forgot-pwd',
        data: { breadcrumb: 'Recuperar contraseña' },
        component: ForgotPwdComponent,
      },
      {
        path: 'singup-process',
        data: { breadcrumb: 'Completar registro' },
        component: RegisterProcessComponent,
      },
      {
        path: 'reset-password',
        data: { breadcrumb: 'Actualizar contraseña' },
        component: ResetPasswordComponent,
      },
      {
        path: 'mision-vision',
        data: { breadcrumb: 'Misión y visión' },
        component: MisionVisionComponent,
      },
      {
        path: 'aviso-privacidad',
        data: { breadcrumb: 'Aviso de privacidad' },
        component: AvisoPrivacidadComponent,
      },
      {
        path: 'terminos-condiciones',
        data: { breadcrumb: 'Terminos y condiciones' },
        component: TerminosCondicionesComponent,
      },
      {
        path: 'preguntas-frecuentes',
        data: { breadcrumb: 'Preguntas frecuentes' },
        component: PreguntasFrecuentesComponent,
      },
      {
        path: 'pedidos',
        data: { breadcrumb: 'Mis compras' },
        component: PedidosComponent,
      },
      {
        path: 'resultados-busqueda',
        data: { breadcrumb: 'Resultados de búsqueda' },
        component: ResultadosBusquedaComponent,
      },
      {
        path: 'profile',
        data: {breadcrumb: 'Mi perfil'},
        children: [
          {path: '', component: ProfileComponent},
          {
            path: 'direcciones', component: DireccionesComponent,
            data: {
              breadcrumb: 'Mis direcciones'
            }
          },
          {
            path: 'change-avatar', component: ChangeProfileImgComponent,
            data: {
              breadcrumb: 'Cambiar foto'
            }
          },
          {
            path: 'change-pwd',
            data: { breadcrumb: 'Cambiar contraseña', tipo: 'Profile'},
            component: ForgotPwdComponent,
          },
        ]
      },
      {
        path: 'list-categories',
        loadChildren: () => import('../productos/productos.module').then(mod => mod.ProductosModule),
      },
      {
        path: 'ventas',
        loadChildren: () => import('../ventas/ventas.module').then(mod => mod.VentasModule),
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
