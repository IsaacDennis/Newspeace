/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import Geonames from 'geonames.js';
import { GeonamesInstance } from 'geonames.js/dist/geonames-types';
import countriesJSON from '../../assets/countries.json';
import Country from '../model/country';
import { News } from '../model/news';
import external from 'external.config.json';
@Injectable({
  providedIn: 'root',
})
export class GeonamesService {
  geonames: GeonamesInstance;
  countries: Country[];

  constructor() {
    this.geonames = Geonames({
      encoding: 'JSON',
      username: external.geonamesKey,
      lan: 'en',
    });
    this.countries = countriesJSON;
  }
  /*Varredura nos atributos da notícia (título) para encontrar a nação em que o fato relatado ocorreu.
    Então, submeter o resultado à uma pesquisa mais exata de localização (por cidade, províncias, etc...)
    LIMITAÇÃO: O plano gratuito do NewsAPI não oferece a notícia completa, prejudicando a detecção de localização e do tema da notícia
  */
  findCountriesInNews(news: News): Country[] {
    // Buscar no título da notícia
    const foundCountries: Country[] = [];
    for (const country of this.countries) {
      if (news.title.includes(country.countryName)) {
        foundCountries.push(country);
        continue;
      }
      // Pesquisar através dos nomes alternativos
      if (country.alternateNames != null) {
        for (const alternateName of country.alternateNames) {
          if (news.title.includes(alternateName)) {
            foundCountries.push(country);
            break;
          }
        }
      }
    }
    return foundCountries;
  }
  /* Retorna um objeto da seguinte forma:
     {
         countryName: "Ethiopia",
         location: "Tigray"
     }
     Caso nenhuma localidade seja encontrada, os atributos serão strings vazias
  */
  async getNewsLocation(news: News) {
    let resultCountry: Country;
    let location = '';
    const potentialCountries = this.findCountriesInNews(news);
    const potentialLocations = this.findPotentialLocations(news);
    const locationsPromises = potentialLocations.map((location) =>
      this.geonames.search({ name_equals: location, orderby: 'relevance' })
    );
    let locationsResults = await Promise.all(locationsPromises);
    // Descartar os resultados que não encontraram uma localidade
    locationsResults = locationsResults.filter(
      (result) => (result as any).totalResultsCount > 0
    );
    // Buscar o resultado mais provável
    const probableResult = locationsResults.reduce(function(
      probable,
      current
    ) {
      return (current as any).totalResultsCount <
        (probable as any).totalResultsCount
        ? current
        : probable;
    },
    locationsResults[0]);
    if (probableResult != null) {
      // Se há somente um país, buscar a localidade que coincida com o país citado. Caso não haja, priorizar a localidade mais relevante
      if (potentialCountries.length === 1) {
        const country = potentialCountries[0];
        const locationInCountry = (probableResult as any).geonames.find(
          (geoname) => geoname.countryName === country.countryName
        );
        if (locationInCountry != null) {
          location = locationInCountry.adminName1;
        }
        resultCountry = country;
      } else if (potentialCountries.length > 1) {
        for (const country of potentialCountries) {
          const locationInCountry = (probableResult as any).geonames.find(
            (geoname) => geoname.countryName === country.countryName
          );
          if (locationInCountry != null) {
            resultCountry = country;
            location = locationInCountry.adminName1;
            break;
          }
        }
      }
    }
    if (
      probableResult == null &&
      resultCountry == null &&
      potentialCountries.length !== 0
    ) {
      resultCountry = potentialCountries[0];
    }
    return {
      resultCountry,
      location,
    };
  }
  /*Extrai da notícia potenciais nomes de localidades, que comecem em letra maiúscula e que sejam prosseguidos por outra.
  Ex.: Maputo, Cabo Delgado, Açores, etc...
    A função retira nomes que coincidem com nome de países.
  */
  findPotentialLocations(news: News): string[] {
    const regex = /^[A-Za-z]/;
    // Regex para remover caracteres especiais ou números, que causam erro ao checar se uma string é ou não é uppercase/lowercase
    const words = news.title.split(' ').filter((word) => regex.test(word));

    const isUppercase = (str) => str[0] === str[0].toUpperCase();
    const isLowercase = (str) => str[0] === str[0].toLowerCase();
    const findNextUppercase = (startIndex) => {
      const subIndex = words.slice(startIndex).findIndex(isUppercase);
      return subIndex === -1 ? -1 : startIndex + subIndex;
    };
    const findNextLowercase = (startIndex) => {
      const subIndex = words.slice(startIndex).findIndex(isLowercase);
      return subIndex === -1 ? -1 : startIndex + subIndex;
    };
    const potentialLocations = [];
    // Insere no array todas as palavras maiúsculas, unindo as que forem consecutivas. Ex.: ['Cabo', 'Delgado'] => 'Cabo Delgado'
    for (let i = 0; i !== -1; ) {
      const startIndex = findNextUppercase(i);
      const endIndex = findNextLowercase(startIndex);
      if (startIndex === -1) {
        break;
      }

      if (endIndex === -1) {
        potentialLocations.push(words.slice(startIndex).join(' '));
      } else {
        potentialLocations.push(words.slice(startIndex, endIndex).join(' '));
      }
      i = endIndex;
    }
    return potentialLocations;
  }
}
