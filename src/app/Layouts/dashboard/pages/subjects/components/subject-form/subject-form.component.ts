import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cursos } from '../../Models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrl: './subject-form.component.scss'
})
export class SubjectFormComponent {

  subjectForm: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<SubjectFormComponent>, @Inject(MAT_DIALOG_DATA) private editingSubject?: Cursos,) {
    this.subjectForm = this.fb.group({
      Nombre: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜ ]+$')]], // Permitir letras, espacios y caracteres acentuados
      FechaInicio: ['', [Validators.required]],
      FechaFin: [''],
      Docente: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜ ]+$')]], // Permitir letras, espacios y caracteres acentuados
      Capacidad: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/), Validators.min(1)]],
      Inscriptos: ['', [Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/), Validators.min(1)]],
      Descripcion: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜ ]+$')]], // Permitir letras, espacios y caracteres acentuados
      Costo: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/), Validators.min(0.01)]],
      Modalidad: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜ ]+$')]], // Permitir letras, espacios y caracteres acentuados
      Turno: ['', [Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜ ]+$')]], // Permitir letras, espacios y caracteres acentuados
    });

    if (editingSubject) {
      this.subjectForm.patchValue(editingSubject);
    }
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

}
