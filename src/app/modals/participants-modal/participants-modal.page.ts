import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-participants-modal',
  templateUrl: './participants-modal.page.html',
  styleUrls: ['./participants-modal.page.scss'],
})
export class ParticipantsModalPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  closeModal(){
    this.modalController.dismiss();
  }
}
