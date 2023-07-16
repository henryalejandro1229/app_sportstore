import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { DireccionesComponent } from './direcciones/direcciones.component';



@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    ProfileComponent,
    DireccionesComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
  ], 
  exports: [
    HomeComponent,
  ]
})
export class PagesModule { }
