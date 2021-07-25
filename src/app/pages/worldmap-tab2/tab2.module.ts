import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab2PageRoutingModule } from './tab2-routing.module';

import { Tab2Page } from './tab2.page';
import { WorldMapComponent } from 'src/app/components/world-map/world-map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab2PageRoutingModule,
  ],
  declarations: [
    Tab2Page,
    WorldMapComponent
  ]
})
export class Tab2PageModule {}
