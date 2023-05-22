import { Injectable } from '@angular/core';
import { ProductoCarritoModelo } from '../models/ventas.modelo';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  arrProductos: ProductoCarritoModelo[] = [];
  constructor() {}

  getProductosCarrito() {
    let productos = localStorage.getItem('productosCarrito')
      ? localStorage.getItem('productosCarrito')
      : '';
    this.arrProductos = [];
    if (productos && productos?.length > 0) {
      this.arrProductos = JSON.parse(productos);
    }
  }

  setProductoCarrito(producto: ProductoCarritoModelo) {
    this.getProductosCarrito();
    this.arrProductos.push(producto);
    localStorage.setItem('productosCarrito', JSON.stringify(this.arrProductos));
  }

  deleteProductoCarrito(producto: ProductoCarritoModelo) {
    this.getProductosCarrito();
    this.arrProductos = this.arrProductos.filter(prod => prod._id.$oid === producto._id.$oid);
    localStorage.setItem('productosCarrito', JSON.stringify(this.arrProductos));
  }
}
