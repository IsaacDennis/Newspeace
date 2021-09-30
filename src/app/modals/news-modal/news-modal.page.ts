import { Component, Input, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Organization } from 'src/app/model/organization';
import { News } from '../../model/news';
import { GeonamesService } from '../../services/geonames.service';
import { NewsService } from '../../services/news.service';
import { OrganizationService } from '../../services/organization.service';
import { AccessibilityService } from '../../services/accessibility.service';
import { PreferencesService } from '../../services/preferences.service';
import { OrgsModalPage } from '../orgs-modal/orgs-modal.page';

@Component({
  selector: 'app-news-modal',
  templateUrl: './news-modal.page.html',
  styleUrls: ['./news-modal.page.scss'],
})
export class NewsModalPage implements OnInit {
  @Input() news: News;
  organizations: Organization[] //Organizações relacionadas a esta notícia
  ttsEnabled: boolean;

  constructor(private modalController: ModalController, private menuController: MenuController, private os: OrganizationService, private geonames: GeonamesService, private newsService: NewsService, private accessibility: AccessibilityService, private preferences: PreferencesService) {

  }

  ngOnInit() {
    this.preferences.ttsAccessibility.subscribe(value => this.ttsEnabled = value);
    let orgsInCountry = [];
    if (this.news.countryName != ""){
      orgsInCountry = this.os.getOrganizationsByCountry(this.news.countryName);
      if (this.news.themes != []){
        this.organizations = this.os.getOrganizationsByTheme(this.news.themes, orgsInCountry);
      }
    }
  }
  closeNewsModal(){
    this.modalController.dismiss();
  }
  openOrgsMenu(){
    this.menuController.open('end');
  }
  closeOrgsMenu() {
    this.menuController.close();
  }
  async presentOrgsModal(org: Organization){
    const orgsModal = await this.modalController.create({
      component: OrgsModalPage,
      componentProps: { org }
    });
    return await orgsModal.present();
  }
}
