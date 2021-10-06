import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcessibilityModalPageRoutingModule } from './acessibility-modal-routing.module';

import { AcessibilityModalPage } from './acessibility-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcessibilityModalPageRoutingModule
  ],
  declarations: [AcessibilityModalPage]
})
export class AcessibilityModalPageModule {}
