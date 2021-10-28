/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { News } from '../model/news';
import { NewsLanguage } from '../model/news-languages';
import themesKeywords from '../../assets/themes-keywords.json';
import { GeonamesService } from './geonames.service';
import { PreferencesService } from './preferences.service';
import external from 'external.config.json';
/*
 * Parâmetros do NewsAPI:
 q -> Palavras-chaves ou frases para pesquisar no título e no conteúdo da notícia.
 apiKey -> chave de acesso (obrigatório)
 qInTitle -> palavras-chaves ou frases que devem estar contidas no título
 sources -> fontes das notícias (por padrão, todas disponíveis)
 domains -> domínios das fontes das notícias (ex., bbc.co.uk | por padrão, todos)
 excludeDomains -> excluir certos sites da requisição
 from/to -> define um intervalo de tempo para extrair as notícias (por padrão, as mais recentes)
 language -> define a linguagem das notícias -> ar, de, en, es, fr, he, it, nl, no, *pt*, ru, se, ud, zh (por padrão, todas)
 sortBy -> três opções para filtrar as notícias = relevancy (relevância), popularity (popularidade) e publishedAt (mais recentes).
 Por padrão, publishedAt
 Exemplo: https://newsapi.org/v2/everything?q=humanitário&apiKey=09d4e48429f8414899f206498986e53a&language=pt
*/
@Injectable({
  providedIn: 'root',
})
export class NewsService {
  apiKey = external.newsApiKey;
  baseURL = `https://newsapi.org/v2/everything?apiKey=${this.apiKey}`;
  news: BehaviorSubject<News[]> = new BehaviorSubject([]);
  languages: NewsLanguage[];
  constructor(private http: HttpClient, private geonames: GeonamesService, private preferences: PreferencesService) {
    this.preferences.languages.subscribe(languages => {
      this.languages = languages;
      if (languages !== []) { this.updateNews(); }
    });
  }

  updateNews(): void {
    this.preferences.readNewsFromDevice().then(localNews => {
      if (localNews.length > 0){
        this.news.next(localNews);
        return;
      }

      const promises = this.languages.map(lang => this.getLanguagePromise(lang));
      Promise.all(promises).then(results => {
        const languagesArray = Array.from(this.languages);
        /* O NewsAPI não inclui a linguagem no objeto da notícia. Adicionei o código da linguagem manualmente através do atributo
           "languageCode" (ex.: pt, en, etc..., ver model/news.ts). A ordem do Promise.all é mantida no array resultante "results"
           (PT, EN, FR - ver o constructor). Assim, o objeto que ocupa o primeiro índice (índice 0) contém as notícias em português,
           o segundo índice as em inglês, e as terceira em francês (e assim por diante, seja qual for a quantidade de linguagens).
        */
        for (let i = 0; i < this.languages.length; i++) {
          const languageCode = this.splitNewsLanguage(languagesArray[i])[0];
          results[i].articles.forEach(news => {
            news.languageCode = languageCode;
          });
        }
        const news = results.reduce((articles, result) => articles.concat(result.articles), []);
        //Inserir tema(s) da notícia
        news.forEach(article => {
          article.themes = this.estimateNewsTheme(article);
        });
        //Inserir país e localidade da notícia
        Promise.all(news.map(article => this.geonames.getNewsLocation(article))).then(results => {
          for (let i = 0; i < results.length; i++) {
            const result = results[i];
            news[i].country = (result as any).resultCountry;
            news[i].location = (result as any).location;
          }
          this.news.next(news);
          this.preferences.saveNews(news);
        });

      });
    });
  }
  // Explicação em model/news-languages.ts: índice 0 do array: código da linguagem; índice 1 do array: string de pesquisa
  splitNewsLanguage(lang: NewsLanguage): string[] {
    return lang.split(':');
  }
  getLanguagePromise(lang: NewsLanguage): Promise<any> {
    const langArray = this.splitNewsLanguage(lang);
    return this.http.get(`${this.baseURL}&q=${langArray[1]}&language=${langArray[0]}`).toPromise();
  }
  getNewsByCountry(countryName: string): News[] {
    return this.news.value.filter(article => article.country?.countryName === countryName);
  }
  estimateNewsTheme(news: News) {
    const foundThemes = [];
    themesKeywords.forEach(theme => {
      for (const keyword of theme[news.languageCode]) {
        if (news.title.includes(keyword)) {
          foundThemes.push(theme.name);
          break;
        }
      }
    });
    return foundThemes;
  }
}
