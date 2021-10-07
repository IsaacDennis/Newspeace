import { Component, Input, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Organization } from 'src/app/model/organization';
import { News } from '../../model/news';
import { OrganizationService } from '../../services/organization.service';
import { AccessibilityService } from '../../services/accessibility.service';
import { PreferencesService } from '../../services/preferences.service';
import { OrgsModalPage } from '../orgs-modal/orgs-modal.page';
import { createAnimation, Animation } from '@ionic/core';

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
    private preferences: PreferencesService
  ) {}

  ngOnInit() {
    this.preferences.ttsAccessibility.subscribe(
      (value) => (this.ttsEnabled = value)
    );
    let orgsInCountry = [];
    if (this.news.countryName !== '') {
      orgsInCountry = this.os.getOrganizationsByCountry(this.news.countryName);
      if (this.news.themes !== []) {
        this.organizations = this.os.getOrganizationsByTheme(
          this.news.themes,
          orgsInCountry
        );
      }
    }
  }
  async closeNewsModal() {
    const arrowSvg = createAnimation()
    .addElement(document.querySelector('.icon-arrow'))
    .duration(200)
    .keyframes([
      { offset: 0, transform: 'scale(1.5) translateX(0)'},
      { offset: 0.5, transform: 'scale(1.5) translateX(2px)'},
      { offset: 1, transform: 'scale(1.5) translateX(-1px)'},
    ]);
    await arrowSvg.play();
    this.modalController.dismiss();
  }
  async openOrgsMenu() {
    const rectA = createAnimation()
      .addElement(document.querySelector('.rectA'))
      .duration(100)
      .fromTo('transform', 'translateX(0)', 'translate(5em)');
    const rectB = createAnimation()
      .addElement(document.querySelector('.rectB'))
      .duration(100)
      .fromTo('transform', 'translateX(0)', 'translate(5em)');
    const rectC = createAnimation()
      .addElement(document.querySelector('.rectC'))
      .duration(100)
      .fromTo('transform', 'translateX(0)', 'translate(5em)');
    await rectA.play();
    await rectB.play();
    await rectC.play();
    this.menuController.open('end');
  }
  async closeOrgsMenu() {
    const closeSvg: Animation = createAnimation()
    .addElement(document.querySelector('.icon-close'))
    .duration(300)
    .easing('ease-in-out')
    .keyframes([
      { offset: 0, transform: 'scale(1.5) rotate(0deg)'},
      { offset: 1, transform: 'scale(0) rotate(360deg)'}
    ]);
    const rectA = createAnimation()
    .addElement(document.querySelector('.rectA'))
    .duration(100)
    .fromTo('transform', 'translateX(5em)', 'translate(0)');
    const rectB = createAnimation()
    .addElement(document.querySelector('.rectB'))
    .duration(100)
    .fromTo('transform', 'translateX(5em)', 'translate(0)');
    const rectC = createAnimation()
    .addElement(document.querySelector('.rectC'))
    .duration(100)
    .fromTo('transform', 'translateX(5em)', 'translate(0)');
    await closeSvg.play();
    await rectA.play();
    await rectB.play();
    await rectC.play();
    this.menuController.close();
    closeSvg.stop();
  }
  async presentOrgsModal(org: Organization) {
    const orgsModal = await this.modalController.create({
      component: OrgsModalPage,
      componentProps: { org },
    });
    return await orgsModal.present();
  }
  async acessibilitySpeak() {
    const soundA = createAnimation()
    .addElement(document.querySelector('.soundA'))
    .easing(`ease-out`)
    .duration(1000)
    .keyframes([
      { offset: 0, opacity: '0'},
      { offset: 0.25, opacity: '0'},
      { offset: 0.50, opacity: '0'},
      { offset: 0.75, opacity: '0'},
      { offset: 1, opacity: '1'}
    ]);
    const soundB = createAnimation()
    .addElement(document.querySelector('.soundB'))
    .easing(`ease-in`)
    .duration(1000)
    .keyframes([
      { offset: 0, opacity: '0'},
      { offset: 0.25, opacity: '0'},
      { offset: 0.50, opacity: '1'},
      { offset: 0.75, opacity: '1'},
      { offset: 1, opacity: '1'}
    ]);

    const parent = createAnimation()
      .iterations(Infinity)
      .addAnimation([soundB, soundA]);

    parent.play();
    await this.accessibility.speak(this.news).then(() => parent.stop());
  }
}
