import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcessibilityModalPage } from './acessibility-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AcessibilityModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcessibilityModalPageRoutingModule {}
