import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Products } from './products/products';
import { authGuard } from './auth-guard';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
    {path: '', component: Login},
    {path: 'register', component: Register},
    {
        path: '',
        component: MainLayout,
        canActivate: [authGuard],
        children: [
            {path: 'products', component: Products}
        ]
    }
];
