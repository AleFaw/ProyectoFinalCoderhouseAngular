import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inscripciones } from '../../Models';
import Swal from 'sweetalert2';
import { SubjectsService } from '../../../subjects/subjects.service';

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.scss']
})
export class InscriptionFormComponent implements OnInit {
  inscriptionForm: FormGroup;
  cursos: any[] = []; // Define una variable para almacenar la lista de cursos

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<InscriptionFormComponent>,
    @Inject(MAT_DIALOG_DATA) private editingInscription: Inscripciones,
    private subjectsService: SubjectsService
  ) {
    this.inscriptionForm = this.fb.group({
      NombreCurso: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ -]+$')]],
      NombreAlumno: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜ ]+$')]],
      Modalidad: [{ value: '', disabled: true }, [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜ ]+$')]],
      Turno: [{ value: '', disabled: true }, [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜ ]+$')]],
    });


    if (editingInscription) {
      this.inscriptionForm.patchValue(editingInscription);
    }
  }

  ngOnInit(): void {
    // No necesitas definir el formulario de nuevo aquí
    this.subjectsService.getCursos().subscribe(cursos => {
      this.cursos = cursos;
    });

    // Verificación de nulidad para inscriptionForm
    this.inscriptionForm?.get('NombreCurso')?.valueChanges.subscribe(nombreCurso => {
      const cursoSeleccionado = this.cursos.find(curso => curso.Nombre === nombreCurso);
      if (cursoSeleccionado) {
        this.inscriptionForm?.get('Modalidad')?.setValue(cursoSeleccionado.Modalidad);
        this.inscriptionForm?.get('Turno')?.setValue(cursoSeleccionado.Turno);
      } else {
        this.inscriptionForm?.get('Modalidad')?.setValue('');
        this.inscriptionForm?.get('Turno')?.setValue('');
      }
    });
  }


  guardar(): void {
    if (this.inscriptionForm.invalid) {
      this.markFormGroupTouched(this.inscriptionForm);
      this.showErrorMessage('Por favor, complete todos los campos correctamente.');
      return;
    }
    this.inscriptionForm.get('Modalidad')?.enable();
    this.inscriptionForm.get('Turno')?.enable();

    // Envía el formulario
    this.dialogRef.close(this.inscriptionForm.value);

    // Deshabilitar los campos nuevamente
    this.inscriptionForm.get('Modalidad')?.disable();
    this.inscriptionForm.get('Turno')?.disable();
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
