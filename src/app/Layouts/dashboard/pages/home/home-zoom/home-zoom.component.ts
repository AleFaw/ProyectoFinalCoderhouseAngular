import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-home-zoom',
  styleUrl: './home-zoom.component.scss',
  template: `
    <img [src]="data.imageUrl" style="max-width: 100%; max-height: 100%;">
  `
})
export class HomeZoomComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
