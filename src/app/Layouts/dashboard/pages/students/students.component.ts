import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms'; // Agrega esta importación
import { MatSelect } from '@angular/material/select';
import { Usuarios } from './Models';
import { MatTabGroup } from '@angular/material/tabs';

//Simula como si fuera una db, la lista de los alumnos.
const STUDENTS_DATA: Usuarios[] = [
  { IDEstudiante: 1, Nombre: 'Juan', Apellido: "Perez", Dni: "28456789", Telefono: "1124251645", Correo: 'juan@example.com', Direccion: 'Calle A, Ciudad X', Usuario: "JuanP", Clave: "JuanP", Rol: "Estudiante", Anio: 6, Comision: '12vo' },
  { IDEstudiante: 2, Nombre: 'Maria', Apellido: 'Gomez', Dni: '36587412', Telefono: '1123456789', Correo: 'maria@example.com', Direccion: 'Calle B, Ciudad Y', Usuario: 'MariaG', Clave: 'MariaG', Rol: 'Estudiante', Anio: 5, Comision: '10mo' },
  { IDEstudiante: 3, Nombre: 'Carlos', Apellido: 'Rodriguez', Dni: '19876543', Telefono: '1123454321', Correo: 'carlos@example.com', Direccion: 'Calle C, Ciudad Z', Usuario: 'CarlosR', Clave: 'CarlosR', Rol: 'Estudiante', Anio: 4, Comision: '8vo' },
  { IDEstudiante: 4, Nombre: 'Ana', Apellido: 'Lopez', Dni: '54321678', Telefono: '1123549876', Correo: 'ana@example.com', Direccion: 'Calle D, Ciudad W', Usuario: 'AnaL', Clave: 'AnaL', Rol: 'Estudiante', Anio: 6, Comision: '12vo' },
  { IDEstudiante: 5, Nombre: 'Luis', Apellido: 'Martinez', Dni: '87654321', Telefono: '1123678901', Correo: 'luis@example.com', Direccion: 'Calle E, Ciudad V', Usuario: 'LuisM', Clave: 'LuisM', Rol: 'Estudiante', Anio: 3, Comision: '7mo' },
  { IDEstudiante: 6, Nombre: 'Laura', Apellido: 'Fernandez', Dni: '65432187', Telefono: '1123908765', Correo: 'laura@example.com', Direccion: 'Calle F, Ciudad U', Usuario: 'LauraF', Clave: 'LauraF', Rol: 'Estudiante', Anio: 5, Comision: '10mo' },
  { IDEstudiante: 7, Nombre: 'Gabriel', Apellido: 'Diaz', Dni: '12348765', Telefono: '1123123456', Correo: 'gabriel@example.com', Direccion: 'Calle G, Ciudad T', Usuario: 'GabrielD', Clave: 'GabrielD', Rol: 'Estudiante', Anio: 2, Comision: '6to' },
  { IDEstudiante: 8, Nombre: 'Valeria', Apellido: 'Sanchez', Dni: '87651234', Telefono: '1123345678', Correo: 'valeria@example.com', Direccion: 'Calle H, Ciudad S', Usuario: 'ValeriaS', Clave: 'ValeriaS', Rol: 'Estudiante', Anio: 4, Comision: '8vo' },
  { IDEstudiante: 9, Nombre: 'Ricardo', Apellido: 'Torres', Dni: '23456789', Telefono: '1123456789', Correo: 'ricardo@example.com', Direccion: 'Calle I, Ciudad R', Usuario: 'RicardoT', Clave: 'RicardoT', Rol: 'Estudiante', Anio: 3, Comision: '7mo' },
  { IDEstudiante: 10, Nombre: 'Florencia', Apellido: 'Gimenez', Dni: '45678901', Telefono: '1123567890', Correo: 'florencia@example.com', Direccion: 'Calle J, Ciudad Q', Usuario: 'FlorenciaG', Clave: 'FlorenciaG', Rol: 'Estudiante', Anio: 6, Comision: '12vo' }
]


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})

export class StudentsComponent {
  //Columnas de la tabla
  displayedColumns: string[] = ['demo-nombre', 'demo-apellido', 'demo-telefono', 'demo-correo', 'demo-acciones'];
  //Data source
  dataSource = STUDENTS_DATA;
  //Data source filtrada.
  filteredDataSource = [...STUDENTS_DATA];
  //Inicialización del año del dropdown list
  selectedYear: number = 0;
  //Que estudiante se va a editar
  selectedStudentForEdit: any;
  //ViewChild's
  @ViewChild('filterInput') filterInput!: ElementRef;
  @ViewChild(MatSelect) yearSelect!: MatSelect;
  @ViewChild('addStudentForm') addStudentForm!: NgForm; 
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  @ViewChild('modifyStudentForm') modifyStudentForm!: NgForm;

  //Valores del dropdown list.
  years = [
    { value: 0, viewValue: 'TODOS' },
    { value: 1, viewValue: '1' },
    { value: 2, viewValue: '2' },
    { value: 3, viewValue: '3' },
    { value: 4, viewValue: '4' },
    { value: 5, viewValue: '5' },
    { value: 6, viewValue: '6' },
  ];

  //Para agregar estudiantes
  yearsForAddStudent = this.years.filter(year => year.value !== 0);
  
  //Filtro de lupa (buscar cualquier dato por escrito)
  applyFilter() {
    const filterValue = this.filterInput.nativeElement.value.toLowerCase().trim();

    if (this.selectedYear === 0) {
      this.filteredDataSource = this.dataSource.filter((element: any) =>
        Object.values(element).some((value: any) =>
          value.toString().toLowerCase().includes(filterValue)
        )
      );
    } else {
      this.filteredDataSource = this.dataSource
        .filter(element => element.Anio === this.selectedYear)
        .filter((element: any) =>
          Object.values(element).some((value: any) =>
            value.toString().toLowerCase().includes(filterValue)
          )
        );
    }
  }

  //Filtro de año (limita por año del estudiante)
  applyYearFilter() {
    this.selectedYear = this.yearSelect.value;
    if (this.selectedYear === 0) {
      this.filteredDataSource = [...this.dataSource];
    } else if (this.selectedYear) {
      this.filteredDataSource = this.dataSource.filter(element => element.Anio === this.selectedYear);
    } else {
      this.filteredDataSource = [...this.dataSource];
    }
  }

  //Edita un estudiante
  editStudent(selectedStudent: any) {
    this.selectedStudentForEdit = selectedStudent;
  
    this.tabGroup.selectedIndex = 1; 
  
    //Valores por defecto del formulario.
    this.modifyStudentForm.setValue({
      nombre: selectedStudent.Nombre || '',
      apellido: selectedStudent.Apellido || '',
      dni: selectedStudent.Dni || '',
      telefono: selectedStudent.Telefono || '',
      correo: selectedStudent.Correo || '',
      direccion: selectedStudent.Direccion || '',
      usuario: selectedStudent.Usuario || '',
      clave: selectedStudent.Clave || '',
      rol: selectedStudent.Rol || '',
      anio: selectedStudent.Anio || null,
      comision: selectedStudent.Comision || '',
    });
  }
  

  //Elimina al estudiante
  deleteStudent(element: any): void {
    const index = this.filteredDataSource.findIndex(e => e === element);

    if (index !== -1) {
      this.filteredDataSource.splice(index, 1);
      this.filteredDataSource = [...this.filteredDataSource];
    }
  }

  

  modifyStudent() {
    const formValues = this.modifyStudentForm.value;
  
    this.selectedStudentForEdit.Nombre = formValues.nombre;
    this.selectedStudentForEdit.Apellido = formValues.apellido;
    this.selectedStudentForEdit.Dni = formValues.dni;
    this.selectedStudentForEdit.Telefono = formValues.telefono;
    this.selectedStudentForEdit.Correo = formValues.correo;
    this.selectedStudentForEdit.Direccion = formValues.direccion;
    this.selectedStudentForEdit.Usuario = formValues.usuario;
    this.selectedStudentForEdit.Clave = formValues.clave;
    this.selectedStudentForEdit.Rol = formValues.rol;
    this.selectedStudentForEdit.Anio = formValues.anio;
    this.selectedStudentForEdit.Comision = formValues.comision;

    this.selectedStudentForEdit = null;
  
    this.tabGroup.selectedIndex = 0;
    this.applyYearFilter(); //Para que se actualice y se vea el nuevo estudiante.
  }
  

  addStudent(): void {
    const formValues = this.addStudentForm.value;
    const newStudent: Usuarios = {
      IDEstudiante: STUDENTS_DATA.length + 1, //Genero ID De manera "Automatica"
      Nombre: formValues.nombre,
      Apellido: formValues.apellido,
      Dni: formValues.dni,
      Telefono: formValues.telefono,
      Correo: formValues.correo,
      Direccion: formValues.direccion,
      Usuario: formValues.usuario,
      Clave: formValues.clave,
      Rol: formValues.rol,
      Anio: formValues.anio,
      Comision: formValues.comision
    };
    this.filteredDataSource.push(newStudent);
    this.dataSource = [...this.filteredDataSource];
    this.addStudentForm.reset();
    this.applyYearFilter(); 
  }
}