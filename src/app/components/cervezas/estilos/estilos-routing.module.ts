import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstilosPage } from './estilos.page';

const routes: Routes = [
  {
    path: '',
    component: EstilosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstilosPageRoutingModule {}
