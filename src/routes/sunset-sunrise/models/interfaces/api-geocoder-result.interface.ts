/** Ответ от API c гео-данными */
export interface IApiGeocoderResult {
  /** Идентификатор места */
  place_id: number,
  licence: string,
  powered_by: string,
  osm_type: string,
  osm_id: number,
  /** Широта */
  lat: number,
  /** Долгота */
  lon: number,
  /** Отображаемое название */
  display_name: string,
  /** Адрес */
  address: Partial<{
    tourism: string,
    amenity: string,
    road: string,
    quarter: string,
    suburb: string,
    /** Город */
    city: string,
    /** Область */
    state: string,
    /** Регион */
    region: string,
    /** Индекс */
    postcode: string,
    /** Страна */
    country: string,
    /** Код страны */
    country_code: string,
    /** Номер дома */
    house_number: string,
    /** Строение */
    building: string
  }>,
  boundingbox: string[]
}