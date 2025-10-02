import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    title: 'Auth',
    loadComponent: () => import('../_layout/auth-layout.component').then(m => m.AuthLayoutComponent),
    children: [
      {
        path: 'login',
        title: 'Login',
        loadComponent: () =>
          import('../pages/login/auth-login-page.component').then(m => m.AuthLoginPageComponent),
      },
      {
        path: 'register',
        title: 'Register',
        loadComponent: () =>
          import('../pages/register/auth-register-page.component').then(m => m.AuthRegisterPageComponent),
      },
      {
        path: '',
        title: 'Redirecting',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: '**',
        title: 'Redirecting',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];

export default appRoutes;
