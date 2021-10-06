import { AcessibilityModalPage } from '../acessibility-modal/acessibility-modal.page';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ParticipantsModalPage } from '../participants-modal/participants-modal.page';
@Component({
  selector: 'app-preferences-modal',
  templateUrl: './preferences-modal.page.html',
  styleUrls: ['./preferences-modal.page.scss'],
})
export class PreferencesModalPage implements OnInit {
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  closeModal(){
    this.modalController.dismiss();
  }
  async presentParticipantsModal(){
    const modal = await this.modalController.create({
      component: ParticipantsModalPage
    });
    await modal.present();
  }
  async presentAcessibilityModal() {
    const modal = await this.modalController.create({
      component: AcessibilityModalPage
    });
    await modal.present();
  }
}
