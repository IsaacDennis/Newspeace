import { AfterViewInit, Component, Directive, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { NewsCountryModalPage } from 'src/app/modals/news-country-modal/news-country-modal.page';
import { News } from 'src/app/model/news';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss'],
})
export class WorldMapComponent implements OnInit, AfterViewInit{
  @ViewChild(IonSlides) slides: IonSlides;
  @ViewChildren('path') paths: QueryList<ElementRef>;
  sliderOpts = {
    allowTouchMove: false
  };
  constructor(private ns: NewsService, private modalController: ModalController) { }
  async presentNewsCountryModal(event){
    const countryName = this.getCountryName(event.srcElement);
    const news = this.getNewsInCountry(countryName);
    const newsCountryModal = await this.modalController.create({
      component: NewsCountryModalPage,
      componentProps: {
        news,
        headerTitle: `Notícias (${countryName})`
      }
    });
    return await newsCountryModal.present();
  }
  ngOnInit() {

  }
  ngAfterViewInit(){
    this.paths.forEach(path => {
      const countryName = this.getCountryName(path.nativeElement);
      const newsInCountry = this.getNewsInCountry(countryName);
      if (newsInCountry.length > 0){
        path.nativeElement.classList.add('country-with-news');
      }
    });
  }
  // element => um path (nativeElement | srcElement)
  getCountryName(element): string{
    const countryName = element.attributes.id.nodeValue;
    return countryName.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
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
