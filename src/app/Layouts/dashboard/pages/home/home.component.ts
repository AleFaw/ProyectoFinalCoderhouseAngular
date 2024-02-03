import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HomeZoomComponent } from './home-zoom/home-zoom.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  constructor(private dialog: MatDialog) {}

  openImageModal(num: number): void {
    if(num===1)
    {
      this.dialog.open(HomeZoomComponent, {
        data: {
          imageUrl: '../../../../../assets/img/ABMUsuarios.png'
        }
      });
    }
    else if(num===2){
      this.dialog.open(HomeZoomComponent, {
        data: {
          imageUrl: '../../../../../assets/img/userView.png'
        }
      });
    }
    else if(num===3){
      this.dialog.open(HomeZoomComponent, {
        data: {
          imageUrl: '../../../../../assets/img/subjectView.png'
        }
      });
    }
    
  }
}
