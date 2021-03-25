import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArtyindPageRoutingModule } from './artyind-routing.module';

import { ArtyindPage } from './artyind.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArtyindPageRoutingModule
  ],
  declarations: [ArtyindPage]
})
export class ArtyindPageModule {}
