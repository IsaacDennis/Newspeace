import { Component, Input, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { News } from '../../model/news';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-news-modal',
  templateUrl: './news-modal.page.html',
  styleUrls: ['./news-modal.page.scss'],
})
export class NewsModalPage implements OnInit {
  @Input() news: News;
  constructor(private modalController: ModalController, private menuController: MenuController, private os: OrganizationService) { }

  ngOnInit() {
  }
  closeNewsModal(){
    this.modalController.dismiss();
  }
  openOrgsMenu(){
    this.menuController.open('end');
  }
  closeOrgsMenu() {
    this.menuController.close();
  }
}
