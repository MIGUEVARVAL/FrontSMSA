import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    
    { 
        path: 'login', 
        loadComponent: () => import('./components/authentication/login/login.component').then(m => m.LoginComponent),
    },
    { 
        path: 'signup', 
        loadComponent: () => import('./components/authentication/signup/signup.component').then(m => m.SignupComponent),
    },

    {
        path: 'administration',
        loadComponent: () => import('./components/administration/template-administration/template-administration.component').then(m => m.TemplateAdministrationComponent),
        children: [
            { path: 'students', loadComponent: () => import('./components/administration/students/students.component').then(m => m.StudentsComponent) },
            { path: 'active-students', loadComponent: () => import('./components/administration/active-students/active-students.component').then(m => m.ActiveStudentsComponent) },
            { path: 'subject', loadComponent: () => import('./components/administration/subject/subject.component').then(m => m.SubjectComponent) },
            { path: 'users', loadComponent: () => import('./components/administration/users/users.component').then(m => m.UsersComponent) },
            { path: 'final-grades', loadComponent: () => import('./components/administration/final-grades/final-grades.component').then(m => m.FinalGradesComponent) },
            { path: 'cancellations', loadComponent: () => import('./components/administration/cancellations/cancellations.component').then(m => m.CancellationsComponent) },
            { path: 'facultad', loadComponent: () => import('./components/administration/facultad/facultad.component').then(m => m.FacultadComponent) },
            { path: 'curriculum', loadComponent: () => import('./components/administration/curriculum/curriculum.component').then(m => m.CurriculumComponent) },
        ],
        canActivate: [authGuard],
        data: { roles: ['admin'] }
    },

    {
        path: 'home', loadComponent: () => import('./components/students/home/home.component').then(m => m.HomeComponent),
        canActivate: [authGuard],
        data: { roles: ['user', 'admin'] }
    },

    {
        path: 'students',
        children: [
            {path: 'student-list', loadComponent: () => import('./components/students/students-list/students-list.component').then(m => m.StudentsListComponent)},
            {path: 'student-info', loadComponent: () => import('./components/students/students-info/students-info.component').then(m => m.StudentsInfoComponent)},
            {path: 'student-support-strategy', loadComponent: () => import('./components/students/Strategy/student-support-strategy/student-support-strategy.component').then(m => m.StudentSupportStrategyComponent)},
            {path: 'strategy-detail', loadComponent: () => import('./components/students/Strategy/strategy-detail/strategy-detail.component').then(m => m.StrategyDetailComponent)},
        ],
        canActivate: [authGuard],
        data: { roles: ['user', 'admin'] }
    },

    {
        path: 'curriculum',
        children: [
            {path: 'curriculum-list', loadComponent: () => import('./components/curriculum/curriculum-list/curriculum-list.component').then(m => m.CurriculumListComponent)},
            {path: 'curriculum-detail/:idPlan', loadComponent: () => import('./components/curriculum/curriculum-info/curriculum-info.component').then(m => m.CurriculumInfoComponent)},
        ],
        canActivate: [authGuard],
        data: { roles: ['user', 'admin'] }
    },

];
