import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomeModalPageRoutingModule } from './welcome-modal-routing.module';

import { WelcomeModalPage } from './welcome-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomeModalPageRoutingModule
  ],
  declarations: [WelcomeModalPage]
})
export class WelcomeModalPageModule {}
