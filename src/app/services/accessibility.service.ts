import { Injectable } from '@angular/core';
import { ScreenReader } from '@capacitor/screen-reader';
import { News } from '../model/news';

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {

  constructor() { }
  // Checa se o recurso de fala (para deficientes visuais) está disponível no dispositivo
  async getVoiceAvailability(){
    const { value } = await ScreenReader.isEnabled();
    return value;
  }
  async speak(news: News){
    await ScreenReader.speak({value: news.title});
    await ScreenReader.speak({value: news.description});
  }
}
