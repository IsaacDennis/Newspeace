import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { NewsCountryModalPage } from 'src/app/modals/news-country-modal/news-country-modal.page';
import { News } from 'src/app/model/news';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss'],
})
export class WorldMapComponent implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  sliderOpts = {
    allowTouchMove: false
  };
  constructor(private ns: NewsService, private modalController: ModalController) { }
  async presentNewsCountryModal(event){
    const countryName = this.getCountryName(event);
    const newsArray = this.getNewsInCountry(countryName);
    const newsCountryModal = await this.modalController.create({
      component: NewsCountryModalPage,
      componentProps: { newsArray }
    });
    return await newsCountryModal.present();
  }
  ngOnInit() { }
  getCountryName(event): string{
    const countryName = event.srcElement.attributes.id.nodeValue;
    return countryName.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
  }
  getNewsInCountry(countryName: string){
    return this.ns.getNewsByCountry(countryName);
  }
  async zoom(zoomIn: boolean) {
    const slider = await this.slides.getSwiper();
    const zoom = slider.zoom;
    if (zoomIn === true) {
      slider.updateSize();
      zoom.in();
    } else {
      slider.updateSize();
      zoom.out();
    }
  }
}
