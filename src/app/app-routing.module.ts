import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'administration'
  },
  {
    path: 'administration',
    loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule)
  },
  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
