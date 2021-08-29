import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WelcomeModalPage } from './modals/welcome-modal/welcome-modal.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private modalController: ModalController) {}
  ngOnInit(){
    this.presentWelcomeModal();
  }
  async presentWelcomeModal(){
    const welcomeModal = await this.modalController.create({
      component: WelcomeModalPage
    });
    return await welcomeModal.present();
  }
}
