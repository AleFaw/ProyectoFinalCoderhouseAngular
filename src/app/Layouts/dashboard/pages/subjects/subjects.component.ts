import { Component } from '@angular/core';
import { SubjectsService } from './subjects.service';
import { Cursos } from './Models';
import { MatDialog } from '@angular/material/dialog';
import { SubjectFormComponent } from './components/subject-form/subject-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss'
})
export class SubjectsComponent {
  displayedColumns = ['Nombre', 'FechaInicio', 'FechaFin', 'Costo', 'Acciones'];

  cursos: Cursos[] = []

  constructor(private subjectsService: SubjectsService, public dialog: MatDialog) {
    this.subjectsService.getCursos().subscribe({
      next: (cursos) => {
        this.cursos = cursos;
      }
    })
  }

  onCreate(): void {
    this.dialog.open(SubjectFormComponent,{
      data: {view: false, edit: false}
    }).afterClosed().subscribe({
        next: (result) => {
          if (result) {
            this.subjectsService.addCurso(result).subscribe({
              next: (cursos) => {
                this.cursos = cursos;
              },
            });
          }
        }
      });
  }

  onEdit(curso: Cursos){
    this.dialog.open(SubjectFormComponent, {
      data: {view: false, edit: true, curso}
    }).afterClosed().subscribe({
      next: (result) => {
        if(result){
          this.subjectsService.updateCursos(curso.IDCurso, result).subscribe({
            next: (cursos) => (this.cursos = cursos),
          })
        }
      }
    })
  }

  onDelete(id: number) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.subjectsService.deleteSubjectByID(id).subscribe({
          next: (cursos) => {
            this.cursos = cursos;
            Swal.fire({
              icon: 'success',
              title: 'Borrado exitoso',
              showConfirmButton: false,
              timer: 1500
            });
          },
          error: (error) => {
            console.error('Error al borrar:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un error al borrar el curso.'
            });
          }
        });
      }
    });
  }

  onView(cursos: Cursos){
    this.dialog.open(SubjectFormComponent, {
      data: { view: true, edit: false, curso: cursos}
    })
  }
}
