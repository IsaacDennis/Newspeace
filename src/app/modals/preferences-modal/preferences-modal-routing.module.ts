import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreferencesModalPage } from './preferences-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PreferencesModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreferencesModalPageRoutingModule {}
