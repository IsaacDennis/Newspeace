import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { NewsLanguage } from 'src/app/model/news-languages';
import { PreferencesService } from 'src/app/services/preferences.service';

@Component({
  selector: 'app-welcome-modal',
  templateUrl: './welcome-modal.page.html',
  styleUrls: ['./welcome-modal.page.scss'],
})
export class WelcomeModalPage implements OnInit {
  availableLanguages = [
    {
      display: "Português (Portuguese)",
      value: NewsLanguage.PT,
      checked: false
    },
    {
      display: "Inglês (English)",
      value: NewsLanguage.EN,
      checked: false
    },
    {
      display: "Italiano (Italian)",
      value: NewsLanguage.IT,
      checked: false
    },
    {
      display: "Francês (French)",
      value: NewsLanguage.FR,
      checked: false
    }
  ];
  firstTime: boolean;
  constructor(private modalController: ModalController, private preferences: PreferencesService, private toast: ToastController) {}

  async ngOnInit() {
    this.firstTime = await this.preferences.readFirstTime();
  }
  dismissWelcome(){
    this.modalController.dismiss();
  }
  confirmLanguages(){
    const values = this.availableLanguages.filter(lang => lang.checked).map(lang => lang.value);
    if (values.length === 0) {
      this.presentAlertToast();
      return;
    }
    this.preferences.setLanguages(values);
    this.preferences.setFirstTime(false);
    this.dismissWelcome();
  }
  async presentAlertToast(){
    const toast = await this.toast.create({
      message: 'Selecione pelo menos uma linguagem.',
      duration: 1500
    });
    toast.present();
  }
}
