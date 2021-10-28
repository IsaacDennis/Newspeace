import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { BehaviorSubject } from 'rxjs';
import { News } from '../model/news';
import { NewsLanguage } from '../model/news-languages';
@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  languages: BehaviorSubject<NewsLanguage[]> = new BehaviorSubject([]);
  ttsAccessibility: BehaviorSubject<boolean> = new BehaviorSubject(false); // Acessibilidade através de síntese de fala (text-to-speech)
  constructor() {
    const ttsEnabled = this.readTtsAccessibility().then(value => {
      this.ttsAccessibility.next(value);
    });
    const languages = this.readLanguages().then(languages => {
      this.languages.next(languages);
    });
  }
  // Checa se é a primeira vez que o usuário está abrindo o APK
  async readFirstTime(): Promise<boolean> {
    const { value } = await Storage.get({ key: 'first-time' });
    const firstTime = JSON.parse(value);
    if (firstTime == null) { return true; };

    return firstTime;
  }
  // TODO: fornecer ao usuário a possibilidade de resetar a aplicação, e consequentemente todas as configurações
  async setFirstTime(firstTime: boolean){
    await Storage.set({
      key: 'first-time',
      value: JSON.stringify(firstTime)
    });
  }
  async readTtsAccessibility(): Promise<boolean> {
    const { value } = await Storage.get({ key: 'tts-accessibility' });
    const ttsBoolean = JSON.parse(value);
    if (ttsBoolean == null) { return false; };

    return ttsBoolean;
  }
  async setTtsAccessibility(ttsBoolean: boolean){
    this.ttsAccessibility.next(ttsBoolean);
    await Storage.set({
      key: 'tts-accessibility',
      value: JSON.stringify(ttsBoolean)
    });
  }
  async readLanguages(): Promise<NewsLanguage[]>{
    const { value } = await Storage.get({ key: 'languages' });
    const languages = JSON.parse(value);
    if (languages == null) { return []; }

    return languages;
  }
  async setLanguages(languages: NewsLanguage[]){
    this.languages.next(languages);
    await Storage.set({
      key: 'languages',
      value: JSON.stringify(languages)
    });
  }
  async readNewsFromDevice(): Promise<News[]> {
    const { value } = await Storage.get({ key: 'news' });
    const news = JSON.parse(value);
    if (news == null) { return []; }

    return news;
  }
  async saveNews(news: News[]) {
    await Storage.set({
      key: 'news',
      value: JSON.stringify(news)
    });
  }
  async clearPreferences(){
    await Storage.clear();
  }
}
