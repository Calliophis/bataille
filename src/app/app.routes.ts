import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home', loadComponent: () => import('./home/home.component').then(c => c.HomeComponent)
    },
    {
        path: 'game', loadComponent: () => import('./game/game.component').then(c => c.GameComponent)
    },
    {
        path: '**', redirectTo: 'home'
    }
    
];
