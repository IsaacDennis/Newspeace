import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { News } from '../model/news';
import { NewsModalPage } from '../news-modal/news-modal.page';
import { GeonamesService } from '../services/geonames.service';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  newsArr: News[];
  constructor(private newsService: NewsService, private modalController: ModalController, private geoController: GeonamesService) {}
  ngOnInit(): void {
	  this.newsService.news.subscribe(news => {
      this.newsArr = news;
    });
  }
  async presentNewsModal(news: News){
    const newsModal = await this.modalController.create({
      component: NewsModalPage,
      componentProps: { news }
    });
    return await newsModal.present();
  }
}
