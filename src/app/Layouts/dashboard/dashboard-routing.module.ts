import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
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
        { 
            path: "",
            redirectTo: "inicio", pathMatch: "full" 
        },
]
@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [RouterModule,]
})

export class DashboardRoutingModule {}