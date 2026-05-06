import { Routes } from '@angular/router';

export const pricingRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../features/pricing/pricing.component').then(m => m.PricingComponent)
  }
];