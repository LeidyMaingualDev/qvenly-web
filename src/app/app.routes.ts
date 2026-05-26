import { Routes } from '@angular/router';
import { authGuard } from './core/coreAuth/guards/auth.guard';
import { guestGuard } from './core/coreAuth/guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shared/principalShares/layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/landing/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/dashboard/user-dashboard/user-dashboard.component').then(m => m.UserDashboardComponent)
      }
    ]
  },
  {
    path: '',
    loadComponent: () =>
      import('./shared/principalShares/layouts/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
    children: [
      {
        path: 'auth/login',
        canActivate: [guestGuard],
        loadComponent: () =>
          import('./features/auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'auth/register',
        canActivate: [guestGuard],
        loadComponent: () =>
          import('./features/auth/register/register.component').then(m => m.RegisterComponent)
      },
      {
        path: 'auth/forgot-password',
        canActivate: [guestGuard],
        loadComponent: () =>
          import('./features/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
      },
      {
        path: 'auth/reset-password',
        loadComponent: () =>
          import('./features/auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
      },
      {
        path: 'auth/google/callback',
        loadComponent: () =>
          import('./features/auth/google-callback/google-callback.component').then(m => m.GoogleCallbackComponent)
      },
      {
        path: 'auth/confirm-email',
        loadComponent: () =>
          import('./features/auth/confirm-email/confirm-email.component')
            .then(m => m.ConfirmEmailComponent)
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];