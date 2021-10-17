import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsListModalPageRoutingModule } from './news-list-modal-routing.module';

import { NewsListModalPage } from './news-list-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsListModalPageRoutingModule
  ],
  declarations: [NewsListModalPage]
})
export class NewsListModalPageModule {}
