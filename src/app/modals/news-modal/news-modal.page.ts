import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Organization } from 'src/app/model/organization';
import { News } from '../../model/news';
import { OrganizationService } from '../../services/organization.service';
import { AccessibilityService } from '../../services/accessibility.service';
import { PreferencesService } from '../../services/preferences.service';
import { OrgsModalPage } from '../orgs-modal/orgs-modal.page';
import { createAnimation, Animation } from '@ionic/core';
import { AnimationsService } from 'src/app/services/animations.service';

@Component({
  selector: 'app-news-modal',
  templateUrl: './news-modal.page.html',
  styleUrls: ['./news-modal.page.scss'],
})
export class NewsModalPage implements OnInit {
  @Input() news: News;
  organizations: Organization[]; //Organizações relacionadas a esta notícia
  ttsEnabled: boolean;
  constructor(
    private modalController: ModalController,
    private menuController: MenuController,
    private os: OrganizationService,
    public accessibility: AccessibilityService,
    private preferences: PreferencesService,
    private animations: AnimationsService
  ) {}

  ngOnInit() {
    this.preferences.ttsAccessibility.subscribe(
      (value) => (this.ttsEnabled = value)
    );
    let orgsInCountry = [];
    const countryName = this.news.country?.countryName;
    const themes = this.news.themes;
    if (countryName != null) {
      orgsInCountry = this.os.getOrganizationsByCountry(countryName);
      if (themes !== []) {
        this.organizations = this.os.getOrganizationsByTheme(
          themes,
          orgsInCountry
        );
      }
    }
  }

  async closeNewsModal() {
    this.animations.arrowBack();
    setTimeout(() => this.modalController.dismiss(), 200);
  }
  async openOrgsMenu() {
    this.animations.tabMenuAnimationOpen();
    this.menuController.open('end');
  }
  async closeOrgsMenu() {
    this.menuController.close();
  }
  async presentOrgsModal(org: Organization) {
    const orgsModal = await this.modalController.create({
      component: OrgsModalPage,
      componentProps: { org },
    });
    return await orgsModal.present();
  }
  async acessibilitySpeak() {
    const sounds = await this.animations.acessibilitySpeak();
    const parent: Animation = createAnimation()
      .iterations(Infinity)
      .addAnimation([sounds[0], sounds[1]]);
    parent.play();
    await this.accessibility.speak(this.news).then(() => parent.stop());
  }
  async menuIsOpen() {
    const closeSvg = await this.animations.tabMenuAnimationClose();
    closeSvg.stop();
  }
}
