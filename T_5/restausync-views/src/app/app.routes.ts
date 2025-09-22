import { Routes } from '@angular/router';
import { Layout } from './core/layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: 'home', loadComponent: () => import('./views/home/home').then(m => m.Home) },
      { path: 'login', loadComponent: () => import('./views/auth/login/login').then(m => m.Login) },
      { path: 'register', loadComponent: () => import('./views/auth/register/register').then(m => m.Register) },
      { path: 'admin', loadComponent: () => import('./views/admin/dashboard/dashboard').then(m => m.AdminDashboard) },
      { path: 'admin/usuarios', loadComponent: () => import('./views/admin/usuarios/usuarios').then(m => m.Usuarios) },
      { path: 'chef', loadComponent: () => import('./views/chef/dashboard/dashboard').then(m => m.ChefDashboard) },
      { path: 'mesero', loadComponent: () => import('./views/mesero/dashboard/dashboard').then(m => m.MeseroDashboard) },
      { path: 'admin/ingredientes', loadComponent: () => import('./views/admin/ingredientes/ingredientes').then(m => m.Ingredientes) },
      { path: 'admin/mesas', loadComponent: () => import('./views/admin/mesas/mesas').then(m => m.AdminMesas) },
      { path: 'admin/reportes', loadComponent: () => import('./views/admin/reportes/reportes').then(m => m.Reportes) },
      { path: 'mesero/pedidos', loadComponent: () => import('./views/mesero/pedidos/pedidos').then(m => m.MeseroPedidos) },
      
      
      
      
      
      
      
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];
