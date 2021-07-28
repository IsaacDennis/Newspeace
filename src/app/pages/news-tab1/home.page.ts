import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { News } from '../../model/news';
import { NewsModalPage } from '../../modals/news-modal/news-modal.page';
import { GeonamesService } from '../../services/geonames.service';
import { NewsService } from '../../services/news.service';

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
  parseDate(news: News): string{
    const date = news.publishedAt.split("T")[0];
    const currentDate = new Date();
    const currentMonth = currentDate.getUTCMonth() + 1; //Janeiro é 0
    const currentDay = currentDate.getUTCDate();
    const [,strMonth,strDay] = date.split("-");
    const publishedMonth = Number.parseInt(strMonth);
    const publishedDay = Number.parseInt(strDay);
    if (currentMonth - publishedMonth == 0){
      return currentDay - publishedDay === 0 ? 'Hoje' : `${currentDay - publishedDay} dia(s) atrás`;
    }
    return currentMonth - publishedMonth === 1 ? '1 mês atrás' : `${currentMonth - publishedMonth} meses atrás`;
  }
}
