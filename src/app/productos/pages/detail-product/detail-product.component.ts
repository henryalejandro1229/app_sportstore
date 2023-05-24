import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryModelo, ProductoModelo } from '../../models/productos.modelo';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { combineLatest } from 'rxjs';
import {
  showNotifyError,
  showNotifySuccess,
  showNotifyWarning,
} from 'src/app/shared/functions/Utilities';
import { ProductoCarritoModelo } from 'src/app/ventas/models/ventas.modelo';
import { VentasService } from 'src/app/ventas/services/ventas.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent implements OnInit {
  urlImage = environment.urlImg;
  objCategories!: CategoryModelo[];
  objProducto!: ProductoModelo;
  objCarritoProducto!: ProductoCarritoModelo;
  loading = false;
  category!: string;
  cantidad = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _ps: ProductosService,
    private _vs: VentasService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((res) => {
      if (res) {
        this.consultaInfo(res['ID']);
      }
    });
  }

  consultaInfo(id: string): void {
    this.loading = true;
    combineLatest(this._ps.getProduct(id), this._ps.getCategories()).subscribe(
      (res) => {
        this.objProducto = res[0][0];
        console.log(this.objProducto);
        this.objCategories = res[1];
        let resp = this.objCategories.find(
          (cat) => (cat._id.$oid = this.objProducto.categoryID)
        );
        this.category = resp ? resp.name : '';
        this.loading = false;
      },
      (e) => {
        this.loading = false;
        showNotifyError('Error al consultar información', 'Intente más tarde');
      }
    );
  }

  private setDatoscarrito() {
    this.objCarritoProducto = new ProductoCarritoModelo(this.objProducto, this.category);
  }

  setCantidad(input: any) {
    if(parseFloat(input.value) > this.objProducto.existencia) {
      showNotifyWarning('', 'No se puede solicitar más cantidad de la existente');
      input.value = this.objProducto.existencia;
      return;
    }
    if (parseFloat(input.value) <= 0) {
      showNotifyWarning('', 'Por favor, ingrese una cantidad válida');
      input.value = this.cantidad;
      return;
    }
    this.cantidad = parseFloat(input.value);
  }

  comprarAhora() {
    this.setDatoscarrito();
    this.objCarritoProducto.cantidad = this.cantidad;
  }

  agregarAlCarrito() {
    this.setDatoscarrito();
    this.objCarritoProducto.cantidad = this.cantidad;
    this._vs.setProductoCarrito(this.objCarritoProducto);
    showNotifySuccess('', 'Producto agregado al carrito');
  }
}
