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
  {
    path: 'news-country-modal',
    loadChildren: () => import('./modals/news-country-modal/news-country-modal.module').then( m => m.NewsCountryModalPageModule)
  },
  {
    path: 'welcome-modal',
    loadChildren: () => import('./modals/welcome-modal/welcome-modal.module').then( m => m.WelcomeModalPageModule)
  },
  {
    path: 'preferences-modal',
    loadChildren: () => import('./modals/preferences-modal/preferences-modal.module').then( m => m.PreferencesModalPageModule)
  },
  {
    path: 'participants-modal',
    loadChildren: () => import('./modals/participants-modal/participants-modal.module').then( m => m.ParticipantsModalPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
