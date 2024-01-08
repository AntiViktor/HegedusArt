import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
    { 
        path: 'not-found', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) 
    }, 
    { 
        path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) 
    },
    { 
        path: 'main', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
    },
    { 
        path: '',
        redirectTo: '/contact',
        pathMatch: 'full' 
    },
    { 
        path: '**', 
        redirectTo: '/not-found' 
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }