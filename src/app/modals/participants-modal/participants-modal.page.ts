import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-participants-modal',
  templateUrl: './participants-modal.page.html',
  styleUrls: ['./participants-modal.page.scss'],
})
export class ParticipantsModalPage implements OnInit {
  participants = [
    {
      name: 'Isaac Dennis',
      image: 'assets/participants/isaac-dennis.jpg'
    },
    {
      name: 'Caio Vitor',
      image: 'assets/participants/caio-neves.jpeg'
    },
    {
      name: 'Luiz Felipe',
      image: 'assets/participants/luiz-felipe.jpeg'
    },
    {
      name: 'Fabiano Barros',
      image: 'assets/participants/fabiano-barros.jpg'
    },
    {
      name: 'Yasmin Rossafa',
      image: 'assets/participants/yasmin-rossafa.jpeg'
    }
  ]

  constructor(private modalController: ModalController) { }
   ngOnInit() {
  }
  closeModal(){
    this.modalController.dismiss();
  }
}
