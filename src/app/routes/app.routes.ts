import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./routes/home.routes').then(m => m.homeRoutes)
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./routes/auth.routes').then(m => m.authRoutes)
  },
  {
    path: 'pricing',
    loadChildren: () =>
      import('./routes/pricing.routes').then(m => m.pricingRoutes)
  },
  {
    path: '**',
    redirectTo: ''
  }
];