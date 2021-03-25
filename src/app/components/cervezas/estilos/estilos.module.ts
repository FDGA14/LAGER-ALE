import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstilosPageRoutingModule } from './estilos-routing.module';

import { EstilosPage } from './estilos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstilosPageRoutingModule
  ],
  declarations: [EstilosPage]
})
export class EstilosPageModule {}
