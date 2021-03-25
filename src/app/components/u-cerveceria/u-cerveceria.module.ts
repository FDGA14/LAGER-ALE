import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UCerveceriaPageRoutingModule } from './u-cerveceria-routing.module';

import { UCerveceriaPage } from './u-cerveceria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UCerveceriaPageRoutingModule
  ],
  declarations: [UCerveceriaPage]
})
export class UCerveceriaPageModule {}
