import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  constructor(private modalController: ModalController, private preferences: PreferencesService) {}

  async ngOnInit() {
    this.firstTime = await this.preferences.readFirstTime();
  }
  dismissWelcome(){
    this.modalController.dismiss();
  }
  confirmLanguages(){
    const values = this.availableLanguages.filter(lang => lang.checked).map(lang => lang.value);
    this.preferences.setLanguages(values);
    this.preferences.setFirstTime(false);
    this.dismissWelcome();
  }
}
