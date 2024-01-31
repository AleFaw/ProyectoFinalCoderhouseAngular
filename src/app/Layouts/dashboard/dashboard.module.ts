import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { StudentsModule } from './pages/students/students.module';
import { RouterModule } from '@angular/router';
import { StudentsComponent } from './pages/students/students.component';
import { HomeComponent } from './pages/home/home.component';
import {MatListModule} from '@angular/material/list';
import { SubjectsComponent } from './pages/subjects/subjects.component';
import { InscriptionsComponent } from './pages/inscriptions/inscriptions.component';



@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    StudentsModule,
    MatListModule,
    RouterModule,
    RouterModule.forChild([
      {
        path: 'estudiantes',
        loadChildren: () => import('./pages/students/students.module').then((m) => m.StudentsModule),
      },
      {
        path: 'inicio',
        component: HomeComponent,
      },
      {
        path:'cursos',
        loadChildren: () => import('./pages/subjects/subjects.module').then((m) => m.SubjectsModule),
      },
      {
        path: 'inscripciones',
        loadChildren: () => import('./pages/inscriptions/inscriptions.module').then((m) => m.InscriptionsModule),
      },
    ]),
  ],
  exports: [DashboardComponent],
})
export class DashboardModule { }
