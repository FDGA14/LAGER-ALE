import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScansPageRoutingModule } from './scans-routing.module';

import { ScansPage } from './scans.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScansPageRoutingModule
  ],
  declarations: [ScansPage]
})
export class ScansPageModule {}
