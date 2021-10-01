import { Component, OnInit } from '@angular/core';
import { PreferencesService } from '../../services/preferences.service';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-preferences-modal',
  templateUrl: './preferences-modal.page.html',
  styleUrls: ['./preferences-modal.page.scss'],
})
export class PreferencesModalPage implements OnInit {
  ttsEnabled: boolean;
  constructor(private preferences: PreferencesService, private modalController: ModalController) { }

  ngOnInit() {
    this.preferences.ttsAccessibility.subscribe(value => this.ttsEnabled = value);
  }
  toggleTts(){
    this.preferences.setTtsAccessibility(!this.ttsEnabled);
  }
  closeModal(){
    this.modalController.dismiss();
  }
}
