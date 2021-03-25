import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CervezasPage } from './cervezas.page';

const routes: Routes = [
  {
    path: '',
    component: CervezasPage
  },
  {
    path: 'estilos',
    loadChildren: () => import('./estilos/estilos.module').then( m => m.EstilosPageModule)
  },
  {
    path: 'marcas',
    loadChildren: () => import('./marcas/marcas.module').then( m => m.MarcasPageModule)
  },
  {
    path: 'artyind',
    loadChildren: () => import('./artyind/artyind.module').then( m => m.ArtyindPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CervezasPageRoutingModule {}
