import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetEmailPage } from './reset-email.page';

const routes: Routes = [
  {
    path: '',
    component: ResetEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetEmailPageRoutingModule {}
