import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { Inscripciones } from './Models';
import { Usuarios } from "../students/Models";
import { StudentsService } from '../students/students.service';
import { Cursos } from "../subjects/Models";
import { SubjectsService } from "../subjects/subjects.service";

let inscrip: Inscripciones[] = [
    {
        IDInscripcion: 1,
        IDCurso: 1,
        NombreCurso: 'Angular - Virtual - Noche',
        IDAlumno: 1,
        NombreAlumno: 'Juan Perez',
        Modalidad: 'Virtual',
        Turno: 'Noche',
    },
    {
        IDInscripcion: 2,
        IDCurso: 1,
        NombreCurso: 'Angular - Virtual - Noche',
        IDAlumno: 5,
        NombreAlumno: 'Luis Martinez',
        Modalidad: 'Virtual',
        Turno: 'Noche',
    },
    {
        IDInscripcion: 3,
        IDCurso: 2,
        NombreCurso: 'Data Analytics - Hibrido - Tarde',
        IDAlumno: 9,
        NombreAlumno: 'Ricardo Torres',
        Modalidad: 'Virtual',
        Turno: 'Noche',
    }
]

@Injectable()
export class InscriptionsService {
    constructor(private studentsService: StudentsService, private subjectService: SubjectsService) {}

    getInscripciones(){
        return of(inscrip);
    }

    deleteInscripcionesByID(id: number){
        inscrip = inscrip.filter((el) => el.IDInscripcion != id);
        return this.getInscripciones();
    }

    addInscipciones(data: Inscripciones, dataA: Usuarios[], dataC: Cursos[]){
        let alumno: Usuarios | undefined = this.obtenerAlumno(data.NombreAlumno, dataA);
        let curso: Cursos | undefined = this.obtenerCurso(data.NombreCurso, dataC);

        if (alumno) {
            data.IDAlumno = alumno.IDUsuario;
            if(curso){
                data.IDCurso = curso.IDCurso;
                inscrip = [...inscrip, {...data, IDInscripcion: inscrip.length + 1}];
            }
        }
        return this.getInscripciones();
    }

    updateInscripciones(id: number, data: Inscripciones, dataC: Cursos[]){
        let curso: Cursos | undefined = this.obtenerCurso(data.NombreCurso, dataC);
    
        inscrip = inscrip.map((el) => {
            if (el.IDInscripcion === id) {
                return { ...el, ...data, IDCurso: curso ? curso.IDCurso : el.IDCurso };
            } else {
                return el;
            }
        });
    
        return this.getInscripciones();
    }

    obtenerAlumno(nombreCompleto: string, dataA: Usuarios[]): Usuarios | undefined {
        const alumno = dataA.find(alumno => `${alumno.Nombre} ${alumno.Apellido}` === nombreCompleto);
        return alumno;
    } 

    obtenerCurso(nombreCurso: string, dataA: Cursos[]): Cursos | undefined {
        const curso = dataA.find(curso => curso.Nombre === nombreCurso);
        return curso;
    } 
}
