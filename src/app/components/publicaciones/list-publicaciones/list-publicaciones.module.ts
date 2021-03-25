import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPublicacionesPageRoutingModule } from './list-publicaciones-routing.module';

import { ListPublicacionesPage } from './list-publicaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPublicacionesPageRoutingModule
  ],
  declarations: [ListPublicacionesPage]
})
export class ListPublicacionesPageModule {}
