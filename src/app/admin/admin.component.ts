import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private _auth: AuthService, private router: Router) {
    if(!this._auth.isAuth() && !this._auth.isAdmin())
      this.router.navigate(['/home']);
  }

  ngOnInit(): void {
  }

}
