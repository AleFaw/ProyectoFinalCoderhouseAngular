import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImagenesZoomComponent } from './imagenes-zoom/imagenes-zoom.component';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})



export class HomeComponent {

  authUser: any;

  constructor(private dialog: MatDialog, private authService: AuthService) {}

  ngOnInit(): void {
    this.authUser = this.authService.authUser;
  }

  openImageModal(num: number): void {
    if(num===1)
    {
      this.dialog.open(ImagenesZoomComponent, {
        data: {
          imageUrl: '../../../../../assets/img/ABMUsuarios.png'
        }
      });
    }
    else if(num===2){
      this.dialog.open(ImagenesZoomComponent, {
        data: {
          imageUrl: '../../../../../assets/img/userView.png'
        }
      });
    }
    else if(num===3){
      this.dialog.open(ImagenesZoomComponent, {
        data: {
          imageUrl: '../../../../../assets/img/subjectView.png'
        }
      });
    }
    else if(num===4){
      this.dialog.open(ImagenesZoomComponent, {
        data: {
          imageUrl: '../../../../../assets/img/inscripcionesUser.png'
        }
      });
    }
  }
}
