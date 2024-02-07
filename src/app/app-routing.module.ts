import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Layouts/dashboard/dashboard.component';
import { LoginComponent } from './Layouts/auth/pages/login/login.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    loadChildren: () =>
    import('./Layouts/dashboard/dashboard.module').then(
      (m) => m.DashboardModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
    import('./Layouts/auth/auth.module').then(
      (m) => m.AuthModule),
  },
  {
    path: '',
    redirectTo: 'auth', pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }