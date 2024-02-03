import { Component } from '@angular/core';
import { InscriptionsService } from './inscriptions.service';
import { Inscripciones } from './Models';
import { MatDialog } from '@angular/material/dialog';
import { InscriptionFormComponent } from './components/inscription-form/inscription-form.component';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss'
})

export class InscriptionsComponent {
  displayedColumns = ['NombreCurso', 'NombreAlumno', 'Modalidad', 'Turno', 'Acciones'];

  inscrip: Inscripciones[] = []

  constructor(private inscriptionsService: InscriptionsService, public dialog: MatDialog){
    this.inscriptionsService.getInscripciones().subscribe({
      next: (inscrip) =>{
        this.inscrip = inscrip;
      }
    })
  }

  
  onCreate(): void {
    this.dialog.open(InscriptionFormComponent).afterClosed().subscribe({
        next: (result) => {
          if (result) {
            this.inscriptionsService.addInscipciones(result).subscribe({
              next: (Inscripcion) => {
                this.inscrip = Inscripcion;
              },
            });
          }
        }
      });
  }

  onEdit(inscripcion: Inscripciones){
    this.dialog.open(InscriptionFormComponent, {
      data: inscripcion
    }).afterClosed().subscribe({
      next: (result) => {
        if(result){
          this.inscriptionsService.updateInscripciones(inscripcion.IDInscripcion, result).subscribe({
            next: (inscripciones) => (this.inscrip = inscripciones),
          })
        }
      }
    })
  }

  onDelete(id: number) {
    this.inscriptionsService.deleteInscripcionesByID(id).subscribe({
      next: (inscripcion) => {
        this.inscrip = inscripcion;
      }
    })
  }

}




