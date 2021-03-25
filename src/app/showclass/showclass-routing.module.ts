import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowclassPage } from './showclass.page';

const routes: Routes = [
  {
    path: '',
    component: ShowclassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowclassPageRoutingModule {}
