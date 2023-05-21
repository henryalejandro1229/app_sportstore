export interface CategoryModelo {
  _id: any;
  name: string;
  description: string;
  categorySex: string;
  imageUrl: string;
}

export interface ProductoModelo {
  _id: any;
  categoryID: string;
  title: string;
  description: string;
  categorySex: string;
  imageUrl: string;
  talla: string;
  precio: number;
  codigo: string;
}

export interface ImagenModelo {
  nombreArchivo: string;
  base64textString: string;
}