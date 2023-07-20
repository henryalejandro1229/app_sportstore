import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryModelo } from 'src/app/productos/models/productos.modelo';
import { ProductosService } from 'src/app/productos/services/productos.service';
import { showNotifyError } from 'src/app/shared/functions/Utilities';
import { AuthService } from 'src/app/shared/services/auth.service';
import { combineLatest } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CookiesPageComponent } from 'src/app/shared/cookies-page/cookies-page.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  urlImage = environment.urlImg;
  categoriesMan!: CategoryModelo[];
  categoriesWoman!: CategoryModelo[];

  constructor(
    private readonly _router: Router,
    private _auth: AuthService,
    private _ps: ProductosService,
    private _bottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    this.getCategories();
    if(!this._auth.isCookiesAccept()) this.openBottomSheet();
  }

  openBottomSheet(): void {
    this._bottomSheet.open(CookiesPageComponent);
  }

  viewListCategories(categorySex: string): void {
    this._router.navigate(['/home/list-categories/category', categorySex]);
  }

  getCategories() {
    combineLatest(
      this._ps.getCategoryPerSex('man'),
      this._ps.getCategoryPerSex('woman')
    ).subscribe(
      (res) => {
        this.categoriesMan = res[0];
        this.categoriesWoman = res[1];
        this.limitaCategoria();
      },
      (e) => {
        showNotifyError('Error al registrar', 'Intente mas tarde');
      }
    );
  }

  verCategoria(category: CategoryModelo) {
    this._router.navigate(['/home/list-categories/list-products/category'], {
      queryParams: { id: category._id.$oid },
    });
  }

  limitaCategoria() {
    if (this.categoriesMan.length > 3) {
      this.categoriesMan.length = 3;
    }
    if (this.categoriesWoman.length > 3) {
      this.categoriesWoman.length = 3;
    }
  }
}
