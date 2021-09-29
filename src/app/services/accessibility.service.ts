import { Injectable } from '@angular/core';
import { News } from '../model/news';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {

  constructor() { }
  // Checa se o recurso de fala (para deficientes visuais) está disponível no dispositivo
  async getVoiceAvailability(){

  }
  async speak(news: News){

  }
}
