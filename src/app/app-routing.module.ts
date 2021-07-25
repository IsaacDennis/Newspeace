import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'orgs-modal',
    loadChildren: () => import('./modals/orgs-modal/orgs-modal.module').then( m => m.OrgsModalPageModule)
  },
  {
    path: 'news-modal',
    loadChildren: () => import('./modals/news-modal/news-modal.module').then( m => m.NewsModalPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
