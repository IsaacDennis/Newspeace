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
    const bcpCode = this.getBcpCode(news);
    await TextToSpeech.speak({
      text: news.title,
      lang: bcpCode
    });
  }
  // Retorna o código BCP 47 da linguagem da notícia. Ex.: pt -> pt_BR (usar português brasileiro em vez de português de portugal)
  // TODO: Adicionar mais linguagens
  getBcpCode(news: News){
    const languageCode = news.languageCode;
    if (languageCode === 'pt'){
      return 'pt-BR';
    }
    return 'en-US';
  }
}
