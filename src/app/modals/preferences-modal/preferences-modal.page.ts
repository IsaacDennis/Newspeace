import { Component, OnInit } from '@angular/core';
import { PreferencesService } from '../../services/preferences.service';
import { AlertController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-preferences-modal',
  templateUrl: './preferences-modal.page.html',
  styleUrls: ['./preferences-modal.page.scss'],
})
export class PreferencesModalPage implements OnInit {
  ttsEnabled: boolean;
  constructor(private preferences: PreferencesService, private modalController: ModalController, private alertController: AlertController) { }

  ngOnInit() {
    this.preferences.ttsAccessibility.subscribe(value => this.ttsEnabled = value);
  }
  toggleTts(){
    const toggledTts = !this.ttsEnabled;
    if (toggledTts){
      this.presentLanguageAlert();
    }

    this.preferences.setTtsAccessibility(toggledTts);
  }
  closeModal(){
    this.modalController.dismiss();
  }
  async presentLanguageAlert(){
    const alert = await this.alertController.create({
      header: 'ATENÇÃO:',
      message: 'Caso nenhum som seja reproduzido, é necessário instalar os pacotes de síntese de fala nas configurações do seu dispositivo.',
      buttons: ['Prosseguir']
    });
    await alert.present();
  }
}
