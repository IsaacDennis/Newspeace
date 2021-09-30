import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreferencesModalPageRoutingModule } from './preferences-modal-routing.module';

import { PreferencesModalPage } from './preferences-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreferencesModalPageRoutingModule
  ],
  declarations: [PreferencesModalPage]
})
export class PreferencesModalPageModule {}
