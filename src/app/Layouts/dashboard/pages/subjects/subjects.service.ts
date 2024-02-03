import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { Cursos } from './Models';


let cursos: Cursos[] = [
    {
        IDCurso: 1,
        Nombre: 'Angular - Virtual - Noche',
        FechaInicio: new Date(),
        FechaFin: new Date(),
        Docente: 'Josué Oraya',
        Costo: 168000,
        Modalidad: 'Virtual',
        Capacidad: 30,
        Inscriptos: 3,
        Estado: true,
        Descripcion: 'Introduccion al desarrollo en angular',
        Turno: "Noche",
    },
    {
        IDCurso: 2,
        Nombre: 'Data Analytics - Hibrido - Tarde',
        FechaInicio: new Date(),
        FechaFin: new Date(),
        Docente: 'Daniela Rattia',
        Costo: 168000,
        Modalidad: 'Hibrido',
        Capacidad: 30,
        Inscriptos: 3,
        Estado: true,
        Descripcion: 'Introduccion al data analytics',
        Turno: "Tarde",
    },
]

@Injectable()

export class SubjectsService {

    getCursos() {
        return of(cursos);
    }

    deleteSubjectByID(id: number){
        cursos = cursos.filter((el) => el.IDCurso != id);
        return this.getCursos();
    }

    addCurso(data: Cursos) {
        cursos = [...cursos, { ...data, IDCurso: cursos.length + 1, Estado: true, }];
        return this.getCursos();
    }

    updateCursos(id: number, data: Cursos){
        cursos = cursos.map((el) => el.IDCurso === id ? {...el,...data} : el);
        return this.getCursos();
    }
}