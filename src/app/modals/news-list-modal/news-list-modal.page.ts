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
}
