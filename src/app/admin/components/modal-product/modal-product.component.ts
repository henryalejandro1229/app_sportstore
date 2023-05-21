import { Component, OnInit, Inject, Optional, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  CategoryModelo,
  ProductoModelo,
  ImagenModelo,
} from 'src/app/productos/models/productos.modelo';
import { ProductosService } from 'src/app/productos/services/productos.service';
import {
  showNotifyError,
  showNotifySuccess,
  showSwalWarning,
} from 'src/app/shared/functions/Utilities';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss'],
})
export class ModalProductComponent implements OnInit {
  urlImage = environment.urlImg;
  imageName = '';
  form!: FormGroup;
  id!: string;
  objCategories!: CategoryModelo[];
  objImagen: ImagenModelo = {
    nombreArchivo: '',
    base64textString: '',
  };
  extPermitidas = ['jpg', 'jpeg', 'png'];
  @ViewChild('inputFile') inputFile!: ElementRef;

  constructor(
    private matRef: MatDialogRef<ModalProductComponent>,
    private _ps: ProductosService,
    @Inject(MAT_DIALOG_DATA)
    @Optional()
    public data: {
      objProduct: ProductoModelo;
      isNew: boolean;
    }
  ) {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.pattern(/^[a-z\s\u00E0-\u00FC\u00f1]*$/i)]),
      description: new FormControl('', [Validators.required]),
      categorySex: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required, Validators.min(1)]),
      categoryID: new FormControl('', [Validators.required]),
      talla: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.consultaInfo();
    if (this.data.objProduct) {
      this.id = this.data.objProduct._id.$oid;
      this.form.controls['title'].setValue(this.data.objProduct.title);
      this.form.controls['description'].setValue(
        this.data.objProduct.description
      );
      this.form.controls['categorySex'].setValue(
        this.data.objProduct.categorySex
      );
      this.form.controls['categoryID'].setValue(
        this.data.objProduct.categoryID
      );
      this.form.controls['talla'].setValue(this.data.objProduct.talla);
      this.form.controls['precio'].setValue(this.data.objProduct.precio);
      this.imageName = this.data.objProduct.imageUrl;
    }
  }

  consultaInfo(): void {
    this._ps.getCategories().subscribe(
      (res: CategoryModelo[]) => {
        this.objCategories = res;
      },
      (e) => {
        showNotifyError('Error consultar información', 'Intente mas tarde');
      }
    );
  }

  submit() {
    this.data.isNew ? this.createProduct() : this.updateProduct();
    this.matRef.close(true);
  }

  updateProduct(): void {
    this._ps
      .updateProduct(
        this.id,
        this.form.getRawValue(),
        this.objImagen.nombreArchivo.length
          ? this.objImagen.nombreArchivo
          : this.imageName
      )
      .subscribe(
        (res: any) => {
          showNotifySuccess(
            'Producto actualizado',
            'El producto fue actualizado correctamente'
          );
          if (this.objImagen.nombreArchivo.length > 0) this.uploadImage();
        },
        (e) => {
          showNotifyError('Error al actualizar', 'Intente mas tarde');
        }
      );
  }

  createProduct(): void {
    this._ps
      .createProduct(this.form.getRawValue(), this.objImagen.nombreArchivo)
      .subscribe(
        (res: any) => {
          showNotifySuccess(
            'Producto creado',
            'El producto fue creado correctamente'
          );
          if (this.objImagen.nombreArchivo.length > 0) this.uploadImage();
        },
        (e) => {
          showNotifyError('Error al crear producto', 'Intente mas tarde');
        }
      );
  }

  getTypeSex(type: string): string {
    return type === 'man' ? 'Caballero' : 'Dama';
  }

  getFileExtension(filename: string) {
    return filename.split('.').pop();
  }

  seleccionarImagen(event: any) {
    const files = event.target.files;
    const file = files[0];
    const ext = this.getFileExtension(file.name);
    if (ext && !(this.extPermitidas.includes(ext))) {
      showSwalWarning('Formato de archivo no valido', 'Solo se admiten archivos .jpg, .jpeg, .png');
      this.inputFile.nativeElement.value = "";
      return;
    }
    this.objImagen.nombreArchivo = file.name;

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvent: any) {
    var binaryString = readerEvent.target.result;
    this.objImagen.base64textString = btoa(binaryString);
  }

  uploadImage() {
    console.log(this.objImagen);
    this._ps.uploadFile(this.objImagen).subscribe(
      (datos) => {},
      (e) => {
        showNotifyError('Error al subir imagen', 'Intente mas tarde');
      }
    );
  }
}
