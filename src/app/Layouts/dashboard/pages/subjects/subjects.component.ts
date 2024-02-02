import { Component } from '@angular/core';
import { SubjectsService } from './subjects.service';
import { Cursos } from './Models';
import { MatDialog } from '@angular/material/dialog';
import { SubjectFormComponent } from './components/subject-form/subject-form.component';

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
    this.dialog.open(SubjectFormComponent).afterClosed().subscribe({
        next: (result) => {
          if (result) {
            this.subjectsService.addCurso(result).subscribe({
              next: (cursos) => {
                this.cursos = cursos;
                console.log("Lista completa: ", JSON.stringify(this.cursos));
              },
            });
          }
        }
      });
  }

  onEdit(curso: Cursos){
    this.dialog.open(SubjectFormComponent, {
      data: curso
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
    this.subjectsService.deleteSubjectByID(id).subscribe({
      next: (cursos) => {
        this.cursos = cursos;
      }
    })
  }

}
