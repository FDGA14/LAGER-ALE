import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindUsersPageRoutingModule } from './find-users-routing.module';

import { FindUsersPage } from './find-users.page';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindUsersPageRoutingModule,
    PipesModule
  ],
  declarations: [FindUsersPage]
})
export class FindUsersPageModule {}
