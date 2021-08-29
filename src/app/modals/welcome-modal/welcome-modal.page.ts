import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-welcome-modal',
  templateUrl: './welcome-modal.page.html',
  styleUrls: ['./welcome-modal.page.scss'],
})
export class WelcomeModalPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  dismissWelcome(){
    this.modalController.dismiss();
  }
}
