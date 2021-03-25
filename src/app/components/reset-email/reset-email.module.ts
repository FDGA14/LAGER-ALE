import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetEmailPageRoutingModule } from './reset-email-routing.module';

import { ResetEmailPage } from './reset-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetEmailPageRoutingModule
  ],
  declarations: [ResetEmailPage]
})
export class ResetEmailPageModule {}
