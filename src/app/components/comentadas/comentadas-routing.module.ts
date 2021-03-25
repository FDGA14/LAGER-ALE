import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComentadasPage } from './comentadas.page';

const routes: Routes = [
  {
    path: '',
    component: ComentadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComentadasPageRoutingModule {}
