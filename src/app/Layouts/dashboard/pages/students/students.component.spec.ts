import { TestBed } from "@angular/core/testing";
import { StudentsComponent } from "./students.component";
import { MockProvider } from 'ng-mocks';
import { StudentsService } from "./students.service";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "../../../auth/auth.service";
import { of } from "rxjs";
import { MatIconModule } from '@angular/material/icon'; 

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { StudentsRoutingModule } from './students-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'; // Importa MatDialogRef
import { SharedModule } from '../../../../shared/shared.module';
import { StudentFormComponent } from "./components/student-form/student-form.component";

describe('Pruebas feature module | Usuarios / Estudiantes', () => {
    let component: StudentsComponent;
    let mockStudentsService: jasmine.SpyObj<StudentsService>;
    let mockMatDialogRef: jasmine.SpyObj<MatDialogRef<StudentFormComponent>>;

    beforeEach(async () => {
        mockStudentsService = jasmine.createSpyObj('StudentsService', ['getUsuarios']);
        mockMatDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
        mockMatDialogRef.afterClosed = jasmine.createSpy().and.returnValue(of({}));
    
        await TestBed.configureTestingModule({
            declarations: [StudentsComponent],
            providers: [
                MockProvider(StudentsService, {
                    getUsuarios: () => of([
                        {
                            "IDUsuario": 1,
                            "Nombre": "Juan",
                            "Apellido": "Perez",
                            "Dni": "28456789",
                            "Telefono": "1124251645",
                            "Correo": "juan@example.com",
                            "Direccion": "Calle A, Ciudad X",
                            "Usuario": "JuanP",
                            "Clave": "JuanP",
                            "Rol": "Estudiante",
                            "id": "c482"
                        }
                    ])
                }),
                MockProvider(MatDialog, {
                    open: () => mockMatDialogRef
                }),
                MockProvider(AuthService),
            ],
            imports: [
                CommonModule,
                StudentsRoutingModule,
                MatTableModule,
                MatIconModule,
                MatButtonModule,
                MatTabsModule,
                MatFormFieldModule,
                MatInputModule,
                ReactiveFormsModule,
                MatDatepickerModule,
                MatDialogModule,
                MatSelectModule,
                SharedModule,
                MatIconModule,
            ] 
        }).compileComponents();
        
        component = TestBed.createComponent(StudentsComponent).componentInstance;
    });
    
    
    
    it('Se crea correctamente el componente', () => {
        expect(component).toBeTruthy();
    });

    it('La tabla de usuarios debe contener los siguientes títulos: "Nombre", "Teléfono", "Correo", "Rol" y "Acciones".', () => {
        expect(component.displayedColumns).toContain('Nombre');
        expect(component.displayedColumns).toContain('Telefono');
        expect(component.displayedColumns).toContain('Correo');
        expect(component.displayedColumns).toContain('Rol');
        expect(component.displayedColumns).toContain('Acciones');
    });

    it('Al crear un nuevo usuario se debe abrir el formulario', () => {
        mockMatDialogRef.afterClosed.and.returnValue(of({}));

        component.onCreate();

        expect(mockMatDialogRef.afterClosed).toHaveBeenCalled();
    });
    
    
});
