import { Component } from '@angular/core';
import { StudentsService } from './students.service';
import { Usuarios } from './Models';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormComponent } from './components/student-form/student-form.component';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})

export class StudentsComponent {
  
  displayedColumns: string[] = ['Nombre', 'Telefono', 'Correo', 'Rol', 'Acciones'];

  usuarios: Usuarios[] = []

  constructor(private studentsService: StudentsService, public dialog: MatDialog){
    this.studentsService.getUsuarios().subscribe({
      next: (us) =>{
        this.usuarios = us;
      }
    })
  }

  onCreate(): void {
    this.dialog.open(StudentFormComponent).afterClosed().subscribe({
        next: (result) => {
          if (result) {
            this.studentsService.addUsuarios(result).subscribe({
              next: (us) => {
                this.usuarios = us;
              },
            });
          }
        }
      });
  }

  onEdit(usuario: Usuarios){
    this.dialog.open(StudentFormComponent, {
      data: usuario
    }).afterClosed().subscribe({
      next: (result) => {
        if(result){
          this.studentsService.updateUsuarios(usuario.IDUsuario, result).subscribe({
            next: (us) => (this.usuarios = us),
          })
        }
      }
    })
  }

  onDelete(id: number) {
    this.studentsService.deleteUsuariosByID(id).subscribe({
      next: (us) => {
        this.usuarios = us;
      }
    })
  }

  /*
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

  //Editar o agregar estudiante

  handleFormSubmission(eventData: any): void {
    const formValues = eventData.formValues;
    const actionType = eventData.actionType;
  
    if (actionType === 'Agregar') {
      this.addStudent(formValues);
    } else if (actionType === 'Modificar') {
      this.modifyStudent(formValues);
    } else if (actionType === 'Cancelar'){
      this.selectedStudentForEdit = null;
      this.tabGroup.selectedIndex = 0;
    }
  }

  constructor(private studentService : StudentsService) {}

  editStudent(selectedStudent: any) {
    this.studentService.setSelectedStudent(selectedStudent);
    this.studentService.selectedStudent$.subscribe(student => {
      this.selectedStudentForEdit = student;
      this.tabGroup.selectedIndex = 1;
    });
  }

  //Elimina al estudiante
  deleteStudent(element: any): void {
    const index = this.filteredDataSource.findIndex(e => e === element);

    Swal.fire({
      title: "¿Seguro deseas eliminarlo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        if (index !== -1) {
          this.filteredDataSource.splice(index, 1);
          this.filteredDataSource = [...this.filteredDataSource];
        }
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Estudiante eliminado con exito!!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });    
  }

  modifyStudent(formValues: any): void {
    if (this.selectedStudentForEdit) {
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
  
      const indexInDataSource = this.dataSource.findIndex(student => student.IDEstudiante === this.selectedStudentForEdit.IDEstudiante);
      if (indexInDataSource !== -1) {
        this.dataSource[indexInDataSource] = { ...this.selectedStudentForEdit };
      }
  
      this.selectedStudentForEdit = null;
  
      this.applyYearFilter();
      this.tabGroup.selectedIndex = 0;
    }
  }
  

  addStudent(formValues: any): void {
    const newStudent: Usuarios = {
      IDEstudiante: STUDENTS_DATA.length + 1,
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
    this.applyYearFilter();
  }
  */
}