import { Routes } from '@angular/router';

export const frontRoutes: Routes = [
  {
    path: '',
    title: 'Front',
    loadComponent: () => import('../_layout/front-layout.component').then(m => m.FrontLayoutComponent),
    children: [
      {
        path: '',
        title: 'Home',
        loadComponent: () =>
          import('../pages/home/front-home-page.component').then(m => m.FrontHomePageComponent),
      },
    ],
  },
];

export default frontRoutes;
