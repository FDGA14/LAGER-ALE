import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowclassPageRoutingModule } from './showclass-routing.module';

import { ShowclassPage } from './showclass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowclassPageRoutingModule
  ],
  declarations: [ShowclassPage]
})
export class ShowclassPageModule {}
