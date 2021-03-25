import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPublicacionesPage } from './list-publicaciones.page';

const routes: Routes = [
  {
    path: '',
    component: ListPublicacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPublicacionesPageRoutingModule {}
