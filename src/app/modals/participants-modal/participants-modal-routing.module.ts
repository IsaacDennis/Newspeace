import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParticipantsModalPage } from './participants-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ParticipantsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParticipantsModalPageRoutingModule {}
