import { Routes } from '@angular/router';

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
        path: '**',
        redirectTo: 'account/login'
    },
];