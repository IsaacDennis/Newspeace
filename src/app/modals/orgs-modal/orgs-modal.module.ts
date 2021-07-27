import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrgsModalPageRoutingModule } from './orgs-modal-routing.module';

import { OrgsModalPage } from './orgs-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrgsModalPageRoutingModule
  ],
  declarations: [OrgsModalPage]
})
export class OrgsModalPageModule {}
