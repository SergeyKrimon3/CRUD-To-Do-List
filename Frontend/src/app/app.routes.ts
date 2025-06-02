import { Routes } from '@angular/router';
import { RouteGuard } from './guards/route.guard';

export const routes: Routes = [
        {
        path: 'account',
        loadComponent: () => import('./account/account.component').then((m) => m.AccountComponent),
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'login',
            },
            {
                path: 'login',
                loadComponent: () => import('./account/login/login.component').then((m) => m.LoginComponent),
            },
        ],
    },
    {
        path: 'tasks',
        loadComponent: () => import('./tasks/tasks.component').then((m) => m.TasksComponent),
        canActivate: [RouteGuard],
    },
    {
        path: 'tasks/:mode',
        loadComponent: () => import('./tasks/tasks-crud/tasks-crud.component').then((m) => m.TasksCrudComponent),
        canActivate: [RouteGuard],
    },
    {
        path: 'tasks/:mode/:id',
        loadComponent: () => import('./tasks/tasks-crud/tasks-crud.component').then((m) => m.TasksCrudComponent),
        canActivate: [RouteGuard],
    },
    {
        path: '**',
        redirectTo: 'account/login'
    },
];