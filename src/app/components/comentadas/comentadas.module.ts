import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComentadasPageRoutingModule } from './comentadas-routing.module';

import { ComentadasPage } from './comentadas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComentadasPageRoutingModule
  ],
  declarations: [ComentadasPage]
})
export class ComentadasPageModule {}
