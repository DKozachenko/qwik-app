/** Ответ от API c таймзоной */
export interface IApiTimeResult {
  /** Год */
  year: number,
  /** Месяц */
  month: number,
  /** День */
  day: number,
  /** Час */
  hour: number,
  /** Минута */
  minute: number,
  /** Секунда */
  seconds: number,
  /** Миллисекунда */
  milliSeconds: number,
  dateTime: string,
  date: string,
  time: string,
  /** Название таймзоны */
  timeZone: string,
  /** День недели */
  dayOfWeek: string,
  dstActive: boolean,
}
