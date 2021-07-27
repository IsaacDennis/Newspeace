import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrgsModalPage } from './orgs-modal.page';

const routes: Routes = [
  {
    path: '',
    component: OrgsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrgsModalPageRoutingModule {}
