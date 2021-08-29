import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeModalPage } from './welcome-modal.page';

const routes: Routes = [
  {
    path: '',
    component: WelcomeModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeModalPageRoutingModule {}
