import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../features/landing/home/home.component').then(m => m.HomeComponent)
  }
];