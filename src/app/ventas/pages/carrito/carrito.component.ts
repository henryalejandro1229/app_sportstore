import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { VentasService } from '../../services/ventas.service';
import { ProductoCarritoModelo } from '../../models/ventas.modelo';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {
  form!: FormGroup;
  Productos: ProductoCarritoModelo[] = [];
  urlImage = environment.urlImg;

  constructor(private _vs: VentasService, private fb: FormBuilder) {
    this.form = new FormGroup({});
    this.Productos = this._vs.arrProductos;
  }

  ngOnInit(): void {
    this.Productos.forEach(prod => {
      this.form.addControl(prod._id.$oid, this.fb.control(new FormControl('', [Validators.required, Validators.min(1)])))
    })
  }
}
