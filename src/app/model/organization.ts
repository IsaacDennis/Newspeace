export interface Organization {
  activeProjects: number,
  totalProjects: number,
  addressLine1: string,
  addressLine2: string,
  city: string,
  countries: {}, // Dentro do countries, existe o atributo "country", que contém de fato um array com os países de atuação ou somente país
  country: string, // País de origem da instituição, e não de atuação
  id: number,
  iso3166CountryCode: string,
  mission: string,
  name: string,
  postal: number,
  state: string,
  themes: {}, // Que nem os countries: existe o atributo "theme", que contém um array de temas ou somente um objeto
  url: string,

}
