import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Organization } from '../model/organization';
import jsonOrgs from '../../assets/active_organizations.json';
@Injectable({
  providedIn: 'root'
})
// TODO: transição para a API Filesystem do Capacitor
export class OrganizationService {
  organizations: Organization[];
  constructor() {
    this.organizations = (jsonOrgs as any).organizations.organization;
  }
  // O parâmetro organizations, caso não seja especificado, é o atributo "organizations" da classe. Pode-se passar um array de organizações que já foram filtrados por outro método. Ex.: filtrar as organizações que atuam na Índia e então passá-las como parâmetro para "getOrganizationsByTheme"
  getOrganizationsByCountry(countryName, organizations = this.organizations): Organization[] {
    return organizations.filter(org => this.getOrganizationCountries(org).map(country => country.name).includes(countryName));
  }
  getOrganizationsByTheme(themeName, organizations = this.organizations): Organization[] {
    return organizations.filter(org => this.getOrganizationThemes(org).map(theme => theme.name).includes(themeName));
  }
  getOrganizationsByCountryISO(isoName, organizations = this.organizations): Organization[] {
    return organizations.filter(org => this.getOrganizationCountries(org).map(country => country.iso3166CountryCode).includes(isoName));
  }
  /*
      Retorna um array com objeto(s) que representa(m) um país:
      Exemplo:
      {
         iso3166CountryCode: 'US',
         name: 'United States'
      }
      */
  getOrganizationCountries(organization): any[] {
    const countries = organization.countries.country; // Apesar de estar no plural, countries pode ser um array de objetos ou um objeto único
    if (countries != null) {
      return countries instanceof Array ? countries : [countries];
    }
    return [];
  }
  /*
      Exemplo de objeto 'theme':
      {
         id: 'eco',
         name: 'Ecosystem Restoration'
      }
      */
  getOrganizationThemes(organization): any[] {
    const themes = organization.themes.theme // Ocorre o mesmo que a variável countries
    if (themes != null) {
      return themes instanceof Array ? themes : [themes];
    }
    return [];
  }
}
