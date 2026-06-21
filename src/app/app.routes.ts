import { Routes } from '@angular/router';
import { PatientsPage } from './patients/patients-page/patients-page';
import { Login } from './auth/login/login';
import { authGuard } from './guards/auth-guard';
export const routes: Routes = [
  {
    path: 'patients',
    component: PatientsPage,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: Login
  },
  {path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];