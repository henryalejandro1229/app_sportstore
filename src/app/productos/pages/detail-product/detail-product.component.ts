import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryModelo, ProductoModelo } from '../../models/productos.modelo';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { combineLatest } from 'rxjs';
import { showNotifyError } from 'src/app/shared/functions/Utilities';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

  urlImage = environment.urlImg;
  objCategories!: CategoryModelo[];
  objProducto!: ProductoModelo;
  loading = false;
  category!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _ps: ProductosService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((res) => {
      if (res) {
        this.consultaInfo(res['ID']);
      }
    });
  }

  consultaInfo(id: string): void {
    this.loading = true;
    combineLatest(
      this._ps.getProduct(id),
      this._ps.getCategories()
    ).subscribe(
      (res) => {
        this.objProducto = res[0][0];
        this.objCategories = res[1];
        let resp = this.objCategories.find(cat => cat._id.$oid = this.objProducto.categoryID);
        this.category = resp? resp.name : '';
        this.loading = false;
      },
      (e) => {
        this.loading = false;
        showNotifyError('Error al consultar información', 'Intente más tarde');
      }
    );
  }
}
