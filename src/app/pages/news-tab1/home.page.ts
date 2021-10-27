import {  Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { News } from '../../model/news';
import { NewsModalPage } from '../../modals/news-modal/news-modal.page';
import { PreferencesModalPage } from '../../modals/preferences-modal/preferences-modal.page';
import { NewsService } from '../../services/news.service';
import { Animation, AnimationController } from '@ionic/angular';
import { NewsListModalPage } from 'src/app/modals/news-list-modal/news-list-modal.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  allNews: News[];
  afNews: News[];
  euNews: News[];
  saNews: News[];
  naNews: News[];
  asNews: News[];
  ocNews: News[];
  highlightedNews: News[];
  isLoading: boolean;
  constructor(private newsService: NewsService, private modalController: ModalController, private animationCtrl: AnimationController) {}
  ngOnInit() {
    this.isLoading = true;
	  this.newsService.news.subscribe(news => {
      this.allNews = news;
      if (this.allNews.length > 0){
        this.isLoading = false;
        this.highlightedNews = news.slice(0, 3);
        this.afNews = news.filter(article => article.country?.continent === 'AF');
        this.euNews = news.filter(article => article.country?.continent === 'EU');
        this.saNews = news.filter(article => article.country?.continent === 'SA');
        this.naNews = news.filter(article => article.country?.continent === 'NA');
        this.asNews = news.filter(article => article.country?.continent === 'AS');
        this.ocNews = news.filter(article => article.country?.continent === 'OC');
      }
    });
  }
  async presentNewsListModal(headerTitle: string, news: News[]){
    const newsListModal = await this.modalController.create({
      component: NewsListModalPage,
      componentProps: {
        headerTitle,
        news
      }
    });
    return await newsListModal.present();
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
    const settingsSvg: Animation = this.animationCtrl.create()
    .addElement(document.querySelector('.icon-settings'))
    .duration(300)
    .easing('ease-in-out')
    .keyframes([
      { offset: 0, transform: 'scale(2) rotate(0deg)'},
      { offset: 1, transform: 'scale(2) rotate(360deg)'}
    ]);
    await settingsSvg.play();
    return await preferencesModal.present();
  }

}
