export interface Country {
  continent: string, // Acrônimo do continente do país. Ex.: AF = Africa
  continentName: string,
  capital: string,
  languages: string, //Linguagens do país, separadas por vírgula (ex.: languages: "pt-br,en,fr")
  areaInSqKm: string, // Área do país em km ao quadrado
  countryCode: string,
  countryName: string,
  currencyCode: string,
  east: number,
  fipsCode: string,
  geonameId: number,
  isoAlpha3: string,
  isoNumeric: string,
  north: number,
  population: string,
  postalCodeFormat: string,
  south: number,
  west: number,
  alternateNames?: string[]
}
