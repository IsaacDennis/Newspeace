import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsCountryModalPage } from './news-country-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NewsCountryModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsCountryModalPageRoutingModule {}
