import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { Inscripciones } from './Models';

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
        IDCurso: 1,
        NombreCurso: 'Data Analytics - Hibrido - Tarde',
        IDAlumno: 9,
        NombreAlumno: 'Ricardo Torres',
        Modalidad: 'Virtual',
        Turno: 'Noche',
    }
   
]

@Injectable()
export class InscriptionsService {
    getInscripciones(){
        return of(inscrip);
    }

    deleteInscripcionesByID(id: number){
        inscrip = inscrip.filter((el) => el.IDInscripcion != id);
        return this.getInscripciones();
    }

    addInscipciones(data: Inscripciones){
        inscrip = [...inscrip, {...data, IDInscripcion: inscrip.length + 1}];
        return this.getInscripciones();
    }

    updateInscripciones(id: number, data: Inscripciones){
        inscrip = inscrip.map((el) => el.IDInscripcion === id ? {...el,...data} : el);
        return this.getInscripciones();
    }
}
