import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Products } from './products/products';
import { authGuard } from './auth-guard';
import { MainLayout } from './layout/main-layout/main-layout';
import { Notes } from './notes/notes';
import { notAuthGuard } from './not-auth-guard';

export const routes: Routes = [
    {path: '', component: Login, canActivate: [notAuthGuard]},
    {path: 'register', component: Register, canActivate: [notAuthGuard]},
    {
        path: '',
        component: MainLayout,
        canActivate: [authGuard],
        children: [
            {path: 'products', component: Products},
            {path: 'notes', component: Notes}
        ]
    }
];
