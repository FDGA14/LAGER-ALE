import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CervezasPageRoutingModule } from './cervezas-routing.module';

import { CervezasPage } from './cervezas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CervezasPageRoutingModule
  ],
  declarations: [CervezasPage]
})
export class CervezasPageModule {}
