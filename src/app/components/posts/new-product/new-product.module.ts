import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewProductPageRoutingModule } from './new-product-routing.module';

import { NewProductPage } from './new-product.page';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewProductPageRoutingModule,
    NewProductPageModule,
    NewProductPage,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [NewProductPageModule, NewProductPage],
  declarations: [NewProductPage]
})
export class NewProductPageModule {}
