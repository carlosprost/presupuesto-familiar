import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'configuracion',
        loadComponent: () => import('./views/configuracion/configuracion.component').then(m => m.ConfiguracionComponent)
    },
    {
        path: 'reportes',
        loadComponent: () => import('./views/reports/reports.component').then(m => m.ReportsComponent)
    }
];
