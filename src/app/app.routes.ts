import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    
    { path: 'login', loadComponent: () => import('./components/authentication/login/login.component').then(m => m.LoginComponent) },
    { path: 'signup', loadComponent: () => import('./components/authentication/signup/signup.component').then(m => m.SignupComponent) },
    
    {
        path: 'administration',
        loadComponent: () => import('./components/administration/template-administration/template-administration.component').then(m => m.TemplateAdministrationComponent),
        children: [
            { path: 'students', loadComponent: () => import('./components/administration/students/students.component').then(m => m.StudentsComponent) },
            { path: 'users', loadComponent: () => import('./components/administration/users/users.component').then(m => m.UsersComponent) },
            { path: 'final-grades', loadComponent: () => import('./components/administration/final-grades/final-grades.component').then(m => m.FinalGradesComponent) },
            { path: 'cancellations', loadComponent: () => import('./components/administration/cancellations/cancellations.component').then(m => m.CancellationsComponent) },
        ],
    },

    
];
