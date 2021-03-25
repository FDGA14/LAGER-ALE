import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindUsersPage } from './find-users.page';

const routes: Routes = [
  {
    path: '',
    component: FindUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindUsersPageRoutingModule {}
