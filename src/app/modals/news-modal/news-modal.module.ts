import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsModalPageRoutingModule } from './news-modal-routing.module';

import { NewsModalPage } from './news-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsModalPageRoutingModule
  ],
  declarations: [NewsModalPage]
})
export class NewsModalPageModule {}
