import { Injectable } from '@angular/core';
import {
  AltaCarrito,
  DireccionModelo,
  ProductoCarritoModelo,
} from '../models/ventas.modelo';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  arrProductos: ProductoCarritoModelo[] = [];
  cantProductosCarrito: number = 0;
  constructor(private readonly http: HttpClient) {
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
    this.calculaSubtotales();
  }

  setProductoCarrito(producto: ProductoCarritoModelo) {
    this.getProductosCarrito();
    let productoEncontrado = this.arrProductos.find(
      (prod) => prod._id.$oid === producto._id.$oid
    );
    if (productoEncontrado) {
      productoEncontrado.cantidad =
        productoEncontrado.cantidad + producto.cantidad > producto.existencia
          ? producto.existencia
          : productoEncontrado.cantidad + producto.cantidad;
      productoEncontrado.existencia = producto.existencia;
    } else {
      this.arrProductos.push(producto);
    }
    this.calculaSubtotales();
    this.cantProductosCarrito = this.arrProductos.length;
    localStorage.setItem('productosCarrito', JSON.stringify(this.arrProductos));
  }

  setCantidadProductoCarrito(producto: ProductoCarritoModelo) {
    this.arrProductos.forEach((prod) => {
      if (prod._id.$oid === producto._id.$oid)
        prod.existencia = producto.existencia;
    });
    this.calculaSubtotales();
    localStorage.setItem('productosCarrito', JSON.stringify(this.arrProductos));
  }

  deleteProductoCarrito(producto: ProductoCarritoModelo) {
    this.getProductosCarrito();
    this.arrProductos = this.arrProductos.filter(
      (prod) => prod._id.$oid !== producto._id.$oid
    );
    this.cantProductosCarrito = this.arrProductos.length;
    localStorage.setItem('productosCarrito', JSON.stringify(this.arrProductos));
  }

  cleanCarrito() {
    this.arrProductos = [];
    this.cantProductosCarrito = this.arrProductos.length;
    localStorage.setItem('productosCarrito', JSON.stringify(this.arrProductos));
  }

  calculaSubtotales() {
    this.arrProductos.map((prod) => {
      prod.subtotal = prod.cantidad * prod.precio;
    });
  }

  getDirecciones(clienteID: string): Observable<any> {
    return this.http.get(`${environment.url}/sales/getDirecciones.php?clienteID=${clienteID}`);
  }

  createdireccion(formData: DireccionModelo): Observable<any> {
    let params = new HttpParams()
      .append('clienteID', formData.clienteID)
      .append('nombre', formData.nombre)
      .append('estado', formData.estado)
      .append('municipio', formData.municipio)
      .append('colonia', formData.colonia)
      .append('calle', formData.calle)
      .append('telefono', formData.telefono)
      .append('indicaciones', formData.indicaciones);
    return this.http.get(`${environment.url}/sales/createDireccion.php`, {
      params,
    });
  }

  updateDireccion(id: string, formData: DireccionModelo): Observable<any> {
    let params = new HttpParams()
      .append('id', id)
      .append('clienteID', formData.clienteID)
      .append('nombre', formData.nombre)
      .append('estado', formData.estado)
      .append('municipio', formData.municipio)
      .append('colonia', formData.colonia)
      .append('calle', formData.calle)
      .append('telefono', formData.telefono)
      .append('indicaciones', formData.indicaciones);
    return this.http.get(`${environment.url}/sales/updateDireccion.php`, {
      params,
    });
  }

  deleteDireccion(id: string): Observable<any> {
    return this.http.get(
      `${environment.url}/sales/deleteDireccion.php?id=${id}`
    );
  }

  createSale(objVenta: AltaCarrito): Observable<any> {
    let prod : any[] = JSON.parse(JSON.stringify(objVenta.productos));
    prod = prod.map(p => {
      delete p._id;
      return p;
    });

    let dir : DireccionModelo = JSON.parse(JSON.stringify(objVenta.direccionEntrega));
    delete dir._id;
    
    let params = new HttpParams()
      .append('fechaVenta', String(new Date()))
      .append('total', objVenta.total)
      .append('productos', JSON.stringify(prod))
      .append('clienteID', objVenta.clienteID)
      .append('direccionEntrega', JSON.stringify(dir));
    return this.http.get(`${environment.url}/sales/createSale.php`, {
      params,
    });
  }
}
