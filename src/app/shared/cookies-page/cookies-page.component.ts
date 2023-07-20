import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cookies-page',
  templateUrl: './cookies-page.component.html',
  styleUrls: ['./cookies-page.component.scss']
})
export class CookiesPageComponent implements OnInit {

  constructor(private _bottomSheetRef: MatBottomSheetRef<CookiesPageComponent>, private _auth: AuthService) { }

  ngOnInit(): void {
  }

  aceptarCookies() {
    this._auth.setAceptaCookies();
    this._bottomSheetRef.dismiss();
  }

}
