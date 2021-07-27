import { Component, Input, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { News } from '../model/news';
import { GeonamesService } from '../services/geonames.service';
import { NewsService } from '../services/news.service';
import { OrganizationService } from '../services/organization.service';

@Component({
  selector: 'app-news-modal',
  templateUrl: './news-modal.page.html',
  styleUrls: ['./news-modal.page.scss'],
})
export class NewsModalPage implements OnInit {
  @Input() news: News;
  constructor(private modalController: ModalController, private menuController: MenuController, private os: OrganizationService, private geonames: GeonamesService, private newsService: NewsService) {

  }

  ngOnInit() {
  }
  closeNewsModal(){
    this.modalController.dismiss();
  }
  openOrgsMenu(){
    this.menuController.open('end');
  }
}
