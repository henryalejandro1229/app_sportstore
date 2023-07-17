import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-change-profile-img',
  templateUrl: './change-profile-img.component.html',
  styleUrls: ['./change-profile-img.component.scss']
})
export class ChangeProfileImgComponent implements OnInit {

  profileUrl = '../../../assets/resources/perfilimagen.png';
  valueImage = ''; 
  @ViewChild('div') editor!: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.setImg();
  }

  setImg() {
    this.editor.nativeElement.innerHTML = '';
    let cropprImg = document.createElement('img');
    cropprImg.style.width = '100%';
    cropprImg.setAttribute('id', 'croppr');
    this.editor.nativeElement.appendChild(cropprImg);
    cropprImg.setAttribute('src', this.profileUrl);
  }
  
  guardar() {
    console.log(this.valueImage)
  }

}
