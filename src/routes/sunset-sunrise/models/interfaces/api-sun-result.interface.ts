/** Ответ от API c восходом и закатом */
export interface IApiSunResult {
  /** Результат */
  results: {
    /** Восход */
    sunrise: string,
    /** Закат */
    sunset: string,
    solar_noon: string,
    day_length: string,
    civil_twilight_begin: string,
    civil_twilight_end: string,
    nautical_twilight_begin: string,
    nautical_twilight_end: string,
    astronomical_twilight_begin: string,
    astronomical_twilight_end: string
  },
  /** Статус */
  status: string
}