import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsListModalPage } from './news-list-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NewsListModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsListModalPageRoutingModule {}
