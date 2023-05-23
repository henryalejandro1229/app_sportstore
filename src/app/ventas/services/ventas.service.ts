import { Injectable } from '@angular/core';
import { ProductoCarritoModelo } from '../models/ventas.modelo';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  arrProductos: ProductoCarritoModelo[] = [];
  cantProductosCarrito: number = 0;
  constructor() {
    this.getProductosCarrito();
    this.cantProductosCarrito = this.arrProductos.length;
  }

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
    let productoEncontrado = this.arrProductos.find(
      (prod) => prod._id.$oid === producto._id.$oid
    );
    if(productoEncontrado) {
      productoEncontrado.cantidad += producto.cantidad;
      productoEncontrado.existencia = producto.existencia;
    } else {
      this.arrProductos.push(producto);
    }
    this.cantProductosCarrito = this.arrProductos.length;
    localStorage.setItem('productosCarrito', JSON.stringify(this.arrProductos));
  }

  deleteProductoCarrito(producto: ProductoCarritoModelo) {
    this.getProductosCarrito();
    this.arrProductos = this.arrProductos.filter(
      (prod) => prod._id.$oid === producto._id.$oid
    );
    this.cantProductosCarrito = this.arrProductos.length;
    localStorage.setItem('productosCarrito', JSON.stringify(this.arrProductos));
  }
}
