import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsModalPage } from './news-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NewsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsModalPageRoutingModule {}
