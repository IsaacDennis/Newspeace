import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsCountryModalPageRoutingModule } from './news-country-modal-routing.module';

import { NewsCountryModalPage } from './news-country-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsCountryModalPageRoutingModule
  ],
  declarations: [NewsCountryModalPage]
})
export class NewsCountryModalPageModule {}
