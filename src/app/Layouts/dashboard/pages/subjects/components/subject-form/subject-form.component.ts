import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cursos } from '../../Models';
import Swal from 'sweetalert2';
import { SubjectsService } from '../../subjects.service';
import { InscriptionsService } from '../../../inscriptions/inscriptions.service';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrl: './subject-form.component.scss'
})
export class SubjectFormComponent {

  subjectForm: FormGroup;
  inscripciones: any[] = [];
  inscripcionesAlumno: any[] = [];
  viewMode: boolean;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<SubjectFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { curso: Cursos, view: boolean, edit: boolean },
    private subjectsService: SubjectsService,
    private inscriptionService: InscriptionsService,) {
    this.viewMode = this.data.view;
    this.subjectForm = this.fb.group({
      Nombre: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ -]+$')]], // Permitir letras, espacios y caracteres acentuados
      FechaInicio: ['', [Validators.required]],
      FechaFin: [''],
      Docente: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ -]+$')]], // Permitir letras, espacios y caracteres acentuados
      Capacidad: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/), Validators.min(1)]],
      Inscriptos: ['', [Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/), Validators.min(1)]],
      Descripcion: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ -]+$')]], // Permitir letras, espacios y caracteres acentuados
      Costo: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/), Validators.min(0.01)]],
      Modalidad: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ -]+$')]], // Permitir letras, espacios y caracteres acentuados
      Turno: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ -]+$')]], // Permitir letras, espacios y caracteres acentuados
    });

    console.log("Editar: " + this.data.edit + " Ver: " + this.data.view + "Informacion: " + this.data.curso);
    if (this.data.edit) {
      this.subjectForm.patchValue(this.data.curso);
    }
    if (this.data.view) {
      this.subjectForm.patchValue(this.data.curso);
      this.subjectForm.get('Nombre')?.disable();
      this.subjectForm.get('FechaInicio')?.disable();
      this.subjectForm.get('FechaFin')?.disable();
      this.subjectForm.get('Docente')?.disable();
      this.subjectForm.get('Capacidad')?.disable();
      this.subjectForm.get('Inscriptos')?.disable();
      this.subjectForm.get('Descripcion')?.disable();
      this.subjectForm.get('Costo')?.disable();
      this.subjectForm.get('Modalidad')?.disable();
      this.subjectForm.get('Turno')?.disable();
    }
  }

  ngOnInit() {
    this.obtenerCursos();
  }

  guardar(): void {
    if (this.subjectForm.invalid) {
      this.markFormGroupTouched(this.subjectForm);
      this.showErrorMessage('Por favor, complete todos los campos correctamente.');
      return;
    }
    this.dialogRef.close(this.subjectForm.value);
  }

  showErrorMessage(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
    });
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
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
        this.inscriptionService.deleteInscripcionesByID(id).subscribe({
          next: () => {
            this.obtenerCursos();
            Swal.fire({
              icon: 'success',
              title: 'Baja exitosa',
              showConfirmButton: false,
              timer: 1500
            });
          },
          error: (error) => {
            console.error('Error al eliminar la inscripción:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un error al eliminar la inscripción.'
            });
          }
        });
      }
    });
  }


  obtenerCursos(): void {
    // Obtener datos de usuarios
    this.subjectsService.getCursos().subscribe({
      next: (cursos: Cursos[]) => {
        // Utiliza los datos de usuarios aquí según sea necesario

        // Luego, obtén los datos de inscripciones
        this.inscriptionService.getInscripciones().subscribe({
          next: (inscripciones: any[]) => {
            // Utiliza los datos de inscripciones aquí según sea necesario
            // Por ejemplo, puedes asignarlos a una propiedad de clase para usarlos en tu plantilla
            this.inscripciones = inscripciones;

            // Busca el usuario actual dentro de los usuarios obtenidos
            const cursoActual = cursos.find(curso => curso.IDCurso === this.data.curso.IDCurso);
            if (cursoActual) {
              // Si se encuentra el usuario, llama a la función para comprobar los cursos
              this.subjectsService.comprobarAlumnos(cursoActual, inscripciones).subscribe({
                next: (inscripcionesAlumno: any[]) => {
                  // Asigna los cursos del alumno a la propiedad correspondiente
                  this.inscripcionesAlumno = inscripcionesAlumno;
                  console.log("Las inscripciones son: " + JSON.stringify(this.inscripcionesAlumno));
                },
                error: (error) => {
                  console.error('Error al comprobar cursos del alumno:', error);
                }
              });
            }
          },
          error: (error) => {
            console.error('Error al obtener las inscripciones:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error al obtener cursos:', error);
      }
    });
  }
}
