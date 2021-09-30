import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  ttsAccessibility: BehaviorSubject<boolean> = new BehaviorSubject(false); // Acessibilidade através de síntese de fala (text-to-speech)
  constructor() {
    const ttsEnabled = this.readTtsAccessibility().then(value => {
      this.ttsAccessibility.next(value);
    });
  }
  async readTtsAccessibility(): Promise<boolean> {
    const { value } = await Storage.get({ key: 'tts-accessibility' });
    const ttsBoolean = JSON.parse(value);
    if (ttsBoolean == null) return false;

    return ttsBoolean;
  }
  async setTtsAccessibility(ttsBoolean: boolean){
    this.ttsAccessibility.next(ttsBoolean);
    await Storage.set({
      key: 'tts-accessibility',
      value: JSON.stringify(ttsBoolean)
    });
  }
}
