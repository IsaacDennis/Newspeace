import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { PreferencesService } from '../../services/preferences.service';
@Component({
  selector: 'app-acessibility-modal',
  templateUrl: './acessibility-modal.page.html',
  styleUrls: ['./acessibility-modal.page.scss'],
})
export class AcessibilityModalPage implements OnInit {
  ttsEnabled: boolean;
  constructor(
    private modalController: ModalController,
    private preferences: PreferencesService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.preferences.ttsAccessibility.subscribe(value => this.ttsEnabled = value);
  }
  closeModal(){
    this.modalController.dismiss();
  }
  toggleTts(){
    const toggledTts = !this.ttsEnabled;
    if (toggledTts){
      this.presentLanguageAlert();
    }
    this.preferences.setTtsAccessibility(toggledTts);
  }

  async presentLanguageAlert(){
    const alert = await this.alertController.create({
      header: 'ATENÇÃO:',
      // eslint-disable-next-line max-len
      message: 'Caso nenhum som seja reproduzido, é necessário instalar os pacotes de síntese de fala nas configurações do seu dispositivo.',
      buttons: ['Prosseguir']
    });
    await alert.present();
  }
}
