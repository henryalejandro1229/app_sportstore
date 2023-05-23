import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { VentasService } from '../../services/ventas.service';
import { AltaCarrito, ProductoCarritoModelo } from '../../models/ventas.modelo';
import { environment } from 'src/environments/environment';
import { showNotifyWarning } from 'src/app/shared/functions/Utilities';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {
  form!: FormGroup;
  Productos: ProductoCarritoModelo[] = [];
  urlImage = environment.urlImg;
  altaCarrito!: AltaCarrito;

  constructor(private _vs: VentasService, private fb: FormBuilder) {
    this.form = new FormGroup({});
    this.Productos = this._vs.arrProductos;
  }

  ngOnInit(): void {
    this.Productos.forEach(prod => {
      this.form.addControl(prod._id.$oid, this.fb.control(new FormControl(prod.cantidad, [Validators.required, Validators.min(1)])))
    })
  }

  setCantidad(input: any, producto: ProductoCarritoModelo) {
    if(parseFloat(input.value) > producto.existencia) {
      showNotifyWarning('', 'No se puede solicitar más cantidad de la existente');
      input.value = producto.existencia;
      return;
    }
    if (parseFloat(input.value) <= 0) {
      showNotifyWarning('', 'Por favor, ingrese una cantidad válida');
      input.value = producto.cantidad;
      return;
    }
    producto.cantidad = parseFloat(input.value);
    this._vs.setCantidadProductoCarrito(producto);
  }

  eliminarProducto(producto: ProductoCarritoModelo) {
    this._vs.deleteProductoCarrito(producto);
    this.Productos = this._vs.arrProductos;
  }
}
