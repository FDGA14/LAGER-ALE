import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UCerveceriaPage } from './u-cerveceria.page';

const routes: Routes = [
  {
    path: '',
    component: UCerveceriaPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UCerveceriaPageRoutingModule {}
