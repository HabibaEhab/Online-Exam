import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const routes: Routes = [

  { path: '', redirectTo: 'register', pathMatch: 'full' },

    {
        path: '',
        component: AuthLayoutComponent,
        children: [
          {
            path: 'signin',
            loadComponent: () =>
              import('./features/pages/signin/signin.component').then((m) => m.SigninComponent),
          },
          {
            path: 'register',
            loadComponent: () =>
              import('./features/pages/register/register.component').then((m) => m.RegisterComponent),
          },
    
          {
            path: 'forgotpassword',
            loadComponent: () =>
              import('./features/pages/forgotpassword/forgotpassword.component').then((m) => m.ForgotpasswordComponent),
          },
        ],
      },
    
];
