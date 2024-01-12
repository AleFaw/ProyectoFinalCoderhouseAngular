import { Component, ViewChild, ElementRef} from '@angular/core';

import { MatSelect } from '@angular/material/select';



export interface StudentsElements {
  nombre: string;
  apellido: string;
  telefono: number;
  correo: string;
  direccion: string;
  anio: number;
  comision: string;
}

const STUDENTS_DATA: StudentsElements[] = [
  { nombre: 'Juan', apellido: "Perez", telefono: 123456789, correo: 'juan@example.com', direccion: 'Calle A, Ciudad X', anio: 6, comision: '12vo' },
  { nombre: 'María', apellido: "Nuñez", telefono: 987654321, correo: 'maria@example.com', direccion: 'Calle B, Ciudad Y', anio: 6, comision: '12vo' },
  { nombre: 'Carlos', apellido: "Jackson", telefono: 555555555, correo: 'carlos@example.com', direccion: 'Calle C, Ciudad Z', anio: 5, comision: '13vo' },
  { nombre: 'Ana', apellido: "Mancuso", telefono: 111111111, correo: 'ana@example.com', direccion: 'Calle D, Ciudad W', anio: 1, comision: 'C' },
  { nombre: 'Pedro', apellido: "Tabani", telefono: 999999999, correo: 'pedro@example.com', direccion: 'Calle E, Ciudad V', anio: 3, comision: 'D' },
  { nombre: 'Laura', apellido: "Rodriguez", telefono: 777777777, correo: 'laura@example.com', direccion: 'Calle F, Ciudad U', anio: 6, comision: '5ta' },
  { nombre: 'Pablo', apellido: "Camello", telefono: 888888888, correo: 'pablo@example.com', direccion: 'Calle G, Ciudad T', anio: 4, comision: '1ra' },
  { nombre: 'Carmen', apellido: "Gerez", telefono: 444444444, correo: 'carmen@example.com', direccion: 'Calle H, Ciudad S', anio: 2, comision: 'B' },
  { nombre: 'Daniel', apellido: "Jonas", telefono: 666666666, correo: 'daniel@example.com', direccion: 'Calle I, Ciudad R', anio: 5, comision: '4ta' },
  { nombre: 'Isabel', apellido: "Macedo", telefono: 333333333, correo: 'isabel@example.com', direccion: 'Calle J, Ciudad Q', anio: 6, comision: '12vo' },
];


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})

export class StudentsComponent {
  displayedColumns: string[] = ['demo-nombre', 'demo-apellido', 'demo-telefono', 'demo-correo', 'demo-direccion', 'demo-anio', 'demo-comision'];
  dataSource = STUDENTS_DATA;
  filteredDataSource = [...STUDENTS_DATA];
  selectedYear: number = 0;

  years = [
    { value: 0, viewValue: 'TODOS' },
    { value: 1, viewValue: '1' },
    { value: 2, viewValue: '2' },
    { value: 3, viewValue: '3' },
    { value: 4, viewValue: '4' },
    { value: 5, viewValue: '5' },
    { value: 6, viewValue: '6' },
  ];

  @ViewChild('filterInput') filterInput!: ElementRef;
  @ViewChild(MatSelect) yearSelect!: MatSelect;

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
        .filter(element => element.anio === this.selectedYear)
        .filter((element: any) =>
          Object.values(element).some((value: any) =>
            value.toString().toLowerCase().includes(filterValue)
          )
        );
    }
  }

  applyYearFilter() {
    this.selectedYear = this.yearSelect.value;
    if (this.selectedYear === 0) {
      this.filteredDataSource = [...this.dataSource];
    } else if (this.selectedYear) {
      this.filteredDataSource = this.dataSource.filter(element => element.anio === this.selectedYear);
    } else {
      this.filteredDataSource = [...this.dataSource];
    }
  }
}