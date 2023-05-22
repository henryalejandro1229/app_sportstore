import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  form!: FormGroup;

  constructor() {
    this.form = new FormGroup({
      cantidad: new FormControl('', [Validators.required, Validators.min(1)]),
    });
  }

  ngOnInit(): void {
  }

}
