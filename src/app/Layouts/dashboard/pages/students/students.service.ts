import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { Usuarios } from './Models';
import { Inscripciones } from "../inscriptions/Models";


let usuarios: Usuarios[] = [
    { IDUsuario: 1, Nombre: 'Juan', Apellido: "Perez", Dni: "28456789", Telefono: "1124251645", Correo: 'juan@example.com', Direccion: 'Calle A, Ciudad X', Usuario: "JuanP", Clave: "JuanP", Rol: "Estudiante" },
    { IDUsuario: 2, Nombre: 'Maria', Apellido: 'Gomez', Dni: '36587412', Telefono: '1123456789', Correo: 'maria@example.com', Direccion: 'Calle B, Ciudad Y', Usuario: 'MariaG', Clave: 'MariaG', Rol: 'Estudiante'},
    { IDUsuario: 3, Nombre: 'Carlos', Apellido: 'Rodriguez', Dni: '19876543', Telefono: '1123454321', Correo: 'carlos@example.com', Direccion: 'Calle C, Ciudad Z', Usuario: 'CarlosR', Clave: 'CarlosR', Rol: 'Estudiante'},
    { IDUsuario: 4, Nombre: 'Ana', Apellido: 'Lopez', Dni: '54321678', Telefono: '1123549876', Correo: 'ana@example.com', Direccion: 'Calle D, Ciudad W', Usuario: 'AnaL', Clave: 'AnaL', Rol: 'Estudiante' },
    { IDUsuario: 5, Nombre: 'Luis', Apellido: 'Martinez', Dni: '87654321', Telefono: '1123678901', Correo: 'luis@example.com', Direccion: 'Calle E, Ciudad V', Usuario: 'LuisM', Clave: 'LuisM', Rol: 'Profesor'},
    { IDUsuario: 6, Nombre: 'Laura', Apellido: 'Fernandez', Dni: '65432187', Telefono: '1123908765', Correo: 'laura@example.com', Direccion: 'Calle F, Ciudad U', Usuario: 'LauraF', Clave: 'LauraF', Rol: 'Estudiante' },
    { IDUsuario: 7, Nombre: 'Gabriel', Apellido: 'Diaz', Dni: '12348765', Telefono: '1123123456', Correo: 'gabriel@example.com', Direccion: 'Calle G, Ciudad T', Usuario: 'GabrielD', Clave: 'GabrielD', Rol: 'Estudiante'},
    { IDUsuario: 8, Nombre: 'Valeria', Apellido: 'Sanchez', Dni: '87651234', Telefono: '1123345678', Correo: 'valeria@example.com', Direccion: 'Calle H, Ciudad S', Usuario: 'ValeriaS', Clave: 'ValeriaS', Rol: 'Administrador'},
    { IDUsuario: 9, Nombre: 'Ricardo', Apellido: 'Torres', Dni: '23456789', Telefono: '1123456789', Correo: 'ricardo@example.com', Direccion: 'Calle I, Ciudad R', Usuario: 'RicardoT', Clave: 'RicardoT', Rol: 'Estudiante'},
    { IDUsuario: 10, Nombre: 'Florencia', Apellido: 'Gimenez', Dni: '45678901', Telefono: '1123567890', Correo: 'florencia@example.com', Direccion: 'Calle J, Ciudad Q', Usuario: 'FlorenciaG', Clave: 'FlorenciaG', Rol: 'Administrador'}
  ]

  let inscripciones: Inscripciones[] = []

  @Injectable()
export class StudentsService {
    getUsuarios(){
        return of(usuarios);
    }

    deleteUsuariosByID(id: number){
        usuarios = usuarios.filter((el) => el.IDUsuario != id);
        return this.getUsuarios();
    }

    deleteInscripcionesByID(id:number){
        inscripciones = inscripciones.filter((el) => el.IDInscripcion != id);
        return of(inscripciones);
    }

    addUsuarios(data: Usuarios){
        usuarios = [...usuarios, {...data, IDUsuario: usuarios.length + 1}];
        return this.getUsuarios();
    }

    updateUsuarios(id: number, data: Usuarios){
        usuarios = usuarios.map((el) => el.IDUsuario === id ? {...el,...data} : el);
        return this.getUsuarios();
    }

    comprobarCursos(dataA: Usuarios, DataI: Inscripciones[]): Observable<Inscripciones[]> {
        return of(DataI.filter((el) => el.IDAlumno === dataA.IDUsuario));
    }
    
}
