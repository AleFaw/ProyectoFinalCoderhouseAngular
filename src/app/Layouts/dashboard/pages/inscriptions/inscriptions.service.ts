import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { Inscripciones } from './Models';

let inscrip: Inscripciones[] = [
    {
        IDInscripcion: 1,
        IDCurso: 1,
        NombreCurso: 'Angular',
        IDAlumno: 1,
        NombreAlumno: 'Juan Perez',
        Modalidad: 'Virtual',
        Turno: 'Noche',
    },
    {
        IDInscripcion: 2,
        IDCurso: 1,
        NombreCurso: 'Angular',
        IDAlumno: 5,
        NombreAlumno: 'Luis Martinez',
        Modalidad: 'Virtual',
        Turno: 'Noche',
    },
    {
        IDInscripcion: 3,
        IDCurso: 1,
        NombreCurso: 'Angular',
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

    deleteInscriptionByID(id: number){
        inscrip = inscrip.filter((el) => el.IDInscripcion != id);
        return this.getInscripciones();
    }

    addInscription(data: Inscripciones){
        inscrip = [...inscrip, {...data, IDInscripcion: inscrip.length + 1, IDAlumno: 1, IDCurso: 1, Modalidad:'Hola', Turno:'hola',}];
        return this.getInscripciones();
    }

    updateInscription(id: number, data: Inscripciones){
        inscrip = inscrip.map((el) => el.IDInscripcion === id ? {...el,...data} : el);
        return this.getInscripciones();
    }
}
