export class ProductoCarritoModelo {
  _id: any;
  categoryID: string;
  title: string;
  description: string;
  categorySex: string;
  imageUrl: string;
  talla: string;
  cantidad: number;
  existencia: number
  precio: number;
  codigo: string;

  constructor( data: any) {
    this._id = data._id;
    this.categoryID = data.categoryID;
    this.title = data.title;
    this.description = data.description;
    this.categorySex = data.categorySex;
    this.imageUrl = data.imageUrl;
    this.talla = data.talla;
    this.cantidad = data.cantidad;
    this.existencia = 289;
    this.precio = data.precio;
    this.codigo = data.codigo;
  }
}
