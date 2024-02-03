import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    RouterModule.forChild([
      {
        path: 'estudiantes',
        loadChildren: () => import('./pages/students/students.module').then((m) => m.StudentsModule),
      },
      {
        path: 'inicio',
        loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path:'cursos',
        loadChildren: () => import('./pages/subjects/subjects.module').then((m) => m.SubjectsModule),
      },
      {
        path: 'inscripciones',
        loadChildren: () => import('./pages/inscriptions/inscriptions.module').then((m) => m.InscriptionsModule),
      },
      { path: "", redirectTo: "inicio", pathMatch: "full" }, // Corregir aquí
    ]),
  ],
  exports: [DashboardComponent],
})
export class DashboardModule { }
