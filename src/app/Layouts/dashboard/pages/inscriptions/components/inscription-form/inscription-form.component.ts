import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inscripciones } from '../../Models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrl: './inscription-form.component.scss'
})
export class InscriptionFormComponent {
  
  inscriptionForm: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<InscriptionFormComponent>, @Inject(MAT_DIALOG_DATA) private editingInscription?: Inscripciones,) {
    this.inscriptionForm = this.fb.group({
      NombreCurso: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜ ]+$')]], 
      NombreAlumno: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜ ]+$')]], 
    });


    if (editingInscription) {
      this.inscriptionForm.patchValue(editingInscription);
    }
  }
  
  guardar(): void {
    if (this.inscriptionForm.invalid) {
      this.markFormGroupTouched(this.inscriptionForm);
      this.showErrorMessage('Por favor, complete todos los campos correctamente.');
      return;
    }
    this.dialogRef.close(this.inscriptionForm.value);
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

