import { Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { SignupComponent } from './components/authentication/signup/signup.component';

export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Ruta por defecto
    { path: 'login', component: LoginComponent }, // Ruta para el componente de inicio de sesión
    { path: 'signup', component: SignupComponent }, // Ruta para el componente de registro


];
