import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { showNotifyError } from 'src/app/shared/functions/Utilities';
import { CategoryModelo, ProductoModelo } from '../../models/productos.modelo';
import { combineLatest } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
  urlImage = environment.urlImg;
  objCategory!: CategoryModelo;
  objProducts!: ProductoModelo[];
  constructor(
    private activatedRouter: ActivatedRoute,
    private _ps: ProductosService
  ) {
    const idTrasladoInterno = this.activatedRouter.snapshot.paramMap.get('id');
    if (idTrasladoInterno) this.consultaInfo(idTrasladoInterno);
  }

  ngOnInit(): void {}

  consultaInfo(id: string): void {
    combineLatest(
      this._ps.getrCategory(id),
      this._ps.getProductsPerCategory(id)
    ).subscribe(
      (res) => {
        this.objCategory = res[0][0];
        this.objProducts = res[1];
      },
      (e) => {
        showNotifyError('Error consultar información', 'Intente mas tarde');
      }
    );
  }
}
