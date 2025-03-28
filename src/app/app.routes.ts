import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';

export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },

    {
        path: '',
        component: AuthLayoutComponent,
        children: [
          {
            path: 'signin',
            loadComponent: () =>
              import('./core/pages/signin/signin.component').then((m) => m.SigninComponent),
          },
          {
            path: 'register',
            loadComponent: () =>
              import('./core/pages/register/register.component').then((m) => m.RegisterComponent),
          },
    
          {
            path: 'forgotpassword',
            loadComponent: () =>
              import('./core/pages/forgotpassword/forgotpassword.component').then((m) => m.ForgotpasswordComponent),
          },
        ],
    },

    {
      path: '',
      component: BlankLayoutComponent,
      children: [
        {
          path: 'home',
          loadComponent: () =>
            import('./features/pages/home/home.component').then((m) => m.HomeComponent),
            
        },
      ] 
    }    
    
];
