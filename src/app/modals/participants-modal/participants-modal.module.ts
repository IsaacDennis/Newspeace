import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParticipantsModalPageRoutingModule } from './participants-modal-routing.module';

import { ParticipantsModalPage } from './participants-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParticipantsModalPageRoutingModule
  ],
  declarations: [ParticipantsModalPage]
})
export class ParticipantsModalPageModule {}
