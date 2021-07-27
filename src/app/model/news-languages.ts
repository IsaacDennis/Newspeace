/*
Esta enum deve ser usada para a seleção de linguagens das notícias. Consiste em duas strings separadas
por : -> o primeiro, o código da linguagem, e o segundo a string de pesquisa para ser utilizada na API (ver news.service.ts)
*/
export enum NewsLanguage {
  PT = 'pt:humanitário',
  DE = 'de:humanitärd', // Alemão
  EN = 'en:humanitarian', // Inglês
  FR = 'fr:humanitaire', // Francês
  IT = 'it:umanitario', // Italiano
  NL = 'nl:humanitair', //Holandês
}
