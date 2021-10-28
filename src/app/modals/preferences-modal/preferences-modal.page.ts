import { AcessibilityModalPage } from '../acessibility-modal/acessibility-modal.page';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ParticipantsModalPage } from '../participants-modal/participants-modal.page';
import { PreferencesService } from 'src/app/services/preferences.service';
@Component({
  selector: 'app-preferences-modal',
  templateUrl: './preferences-modal.page.html',
  styleUrls: ['./preferences-modal.page.scss'],
})
export class PreferencesModalPage implements OnInit {
  constructor(
    private modalController: ModalController,
    private preferences: PreferencesService,
    private toastController: ToastController
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
  async clearApplication() {
    await this.preferences.clearPreferences();
    const toast = await this.toastController.create({
      message: 'Reinicie o aplicativo.',
      duration: 2500,
      position: 'bottom'
    });
    toast.present();
  }
}
