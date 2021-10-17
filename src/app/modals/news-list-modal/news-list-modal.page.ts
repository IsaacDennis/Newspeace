import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { News } from 'src/app/model/news';
import { NewsModalPage } from '../news-modal/news-modal.page';

@Component({
  selector: 'app-news-list-modal',
  templateUrl: './news-list-modal.page.html',
  styleUrls: ['./news-list-modal.page.scss'],
})
export class NewsListModalPage implements OnInit {
  @Input() news: News[];
  @Input() headerTitle: string;
  hasNews: boolean;
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.hasNews = this.news.length > 0;
  }
  closeNewsListModal(){
    this.modalController.dismiss();
  }
  async presentNewsModal(news: News) {
    const newsModal = await this.modalController.create({
      component: NewsModalPage,
      componentProps: { news }
    });
    return await newsModal.present();
  }
  parseDate(news: News): string {
    const date = news.publishedAt.split('T')[0];
    const currentDate = new Date();
    const currentMonth = currentDate.getUTCMonth() + 1; //Janeiro é 0
    const currentDay = currentDate.getUTCDate();
    const [, strMonth, strDay] = date.split('-');
    const publishedMonth = Number.parseInt(strMonth);
    const publishedDay = Number.parseInt(strDay);
    if (currentMonth - publishedMonth === 0) {
      return currentDay - publishedDay === 0 ? 'Hoje' : `${currentDay - publishedDay} dia(s) atrás`;
    }
    return currentMonth - publishedMonth === 1 ? '1 mês atrás' : `${currentMonth - publishedMonth} meses atrás`;
  }
}