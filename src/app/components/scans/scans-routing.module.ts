import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScansPage } from './scans.page';

const routes: Routes = [
  {
    path: '',
    component: ScansPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScansPageRoutingModule {}
