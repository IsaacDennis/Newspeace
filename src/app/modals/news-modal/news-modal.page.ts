import { Component, Input, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
<<<<<<< HEAD:src/app/modals/news-modal/news-modal.page.ts
import { News } from '../../model/news';
import { OrganizationService } from '../../services/organization.service';
=======
import { News } from '../model/news';
import { GeonamesService } from '../services/geonames.service';
import { OrganizationService } from '../services/organization.service';
>>>>>>> master:src/app/news-modal/news-modal.page.ts

@Component({
  selector: 'app-news-modal',
  templateUrl: './news-modal.page.html',
  styleUrls: ['./news-modal.page.scss'],
})
export class NewsModalPage implements OnInit {
  @Input() news: News;
  constructor(private modalController: ModalController, private menuController: MenuController, private os: OrganizationService, private geonames: GeonamesService) {

  }

  ngOnInit() {
    console.log(this.geonames.findCountriesInNews(this.news))
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
