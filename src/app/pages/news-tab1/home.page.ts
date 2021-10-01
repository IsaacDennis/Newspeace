import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { News } from '../../model/news';
import { NewsModalPage } from '../../modals/news-modal/news-modal.page';
import { PreferencesModalPage } from '../../modals/preferences-modal/preferences-modal.page';
import { GeonamesService } from '../../services/geonames.service';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  newsArr: News[];
  isLoading: boolean;
  constructor(private newsService: NewsService, private modalController: ModalController, private geoController: GeonamesService) {}
  ngOnInit(): void {
    this.isLoading = true;
	  this.newsService.news.subscribe(news => {
      this.newsArr = news;
      if (this.newsArr.length > 0){
        this.isLoading = false;
      }
    });

  }
  async presentNewsModal(news: News){
    const newsModal = await this.modalController.create({
      component: NewsModalPage,
      componentProps: { news }
    });
    return await newsModal.present();
  }
  async presentPreferencesModal(){
    const preferencesModal = await this.modalController.create({ component: PreferencesModalPage });
    return await preferencesModal.present();
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
