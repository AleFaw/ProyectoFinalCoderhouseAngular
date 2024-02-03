import { Component } from '@angular/core';
import { InscriptionsService } from './inscriptions.service';
import { Inscripciones } from './Models';
import { MatDialog } from '@angular/material/dialog';
import { InscriptionFormComponent } from './components/inscription-form/inscription-form.component';
import { Usuarios } from '../students/Models';
import { StudentsService } from '../students/students.service';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss'
})

export class InscriptionsComponent {
  displayedColumns = ['NombreCurso', 'NombreAlumno', 'Modalidad', 'Turno', 'Acciones'];

  inscrip: Inscripciones[] = []
  usuarios: Usuarios[] = []

  constructor(private inscriptionsService: InscriptionsService, private studentsService: StudentsService, public dialog: MatDialog){
    this.inscriptionsService.getInscripciones().subscribe({
      next: (inscrip) =>{
        this.inscrip = inscrip;
      }
    })

    this.studentsService.getUsuarios().subscribe({
      next: (us) =>{
        this.usuarios = us;
      }
    })
  }

  
  onCreate(): void {
    this.dialog.open(InscriptionFormComponent, {
      data: {View: false, edit: false}
    }).afterClosed().subscribe({
        next: (result) => {
          if (result) {
            this.inscriptionsService.addInscipciones(result,this.usuarios).subscribe({
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
      data: { inscripcion: inscripcion, View: false, edit: true  }
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

  onView(inscripcion: Inscripciones) {
    this.dialog.open(InscriptionFormComponent, {
      data: { inscripcion: inscripcion, view: true, edit: false } 
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




