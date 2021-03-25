import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtyindPage } from './artyind.page';

const routes: Routes = [
  {
    path: '',
    component: ArtyindPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtyindPageRoutingModule {}
