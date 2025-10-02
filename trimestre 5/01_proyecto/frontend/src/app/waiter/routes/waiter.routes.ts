import { Routes } from '@angular/router';

export const waiterRoutes: Routes = [
  {
    path: '',
    title: 'Mesero',
    loadComponent: () =>
      import('@waiter/_layout/waiter-layout.component').then((m) => m.default),
    children: [
      {
        path: '',
        title: 'Dashboard',
        loadComponent: () =>
          import(
            '@waiter/pages/_dashboard/waiter-dashboard-page.component'
          ).then((m) => m.default),
      },
      {
        path: 'pedidos',
        title: 'Pedidos',
        loadComponent: () =>
          import('@waiter/pages/pedidos/waiter-pedidos-page.component').then(
            (m) => m.default,
          ),
      },
      {
        path: 'mesas',
        title: 'Mesas',
        loadComponent: () =>
          import('@waiter/pages/mesas/waiter-mesas-page.component').then(
            (m) => m.default,
          ),
      },
      {
        path: 'nuevo-pedido',
        title: 'Nuevo Pedido',
        loadComponent: () =>
          import('@waiter/pages/nuevo-pedido/nuevo-pedido.component').then(
            (m) => m.default,
          ),
      },
      {
        path: 'perfil',
        title: 'Perfil',
        loadComponent: () =>
          import('@waiter/pages/perfil/perfil.component').then(
            (m) => m.default,
          ),
      },
      {
        path: '**',
        title: 'Redirecting ... ',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];

export default waiterRoutes;
