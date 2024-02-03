import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-imagenes-zoom',
  templateUrl: './imagenes-zoom.component.html',
  styleUrl: './imagenes-zoom.component.scss',
  template: `
    <img [src]="data.imageUrl" style="max-width: 100%; max-height: 100%;">
  `
})
export class ImagenesZoomComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
