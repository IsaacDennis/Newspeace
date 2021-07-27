import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Organization } from '../../model/organization';

@Component({
  selector: 'app-orgs-modal',
  templateUrl: './orgs-modal.page.html',
  styleUrls: ['./orgs-modal.page.scss'],
})
export class OrgsModalPage implements OnInit {
  @Input() org: Organization;
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  closeOrgsModal(){
    this.modalController.dismiss();
  }
}
