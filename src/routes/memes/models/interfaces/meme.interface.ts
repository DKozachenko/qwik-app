/** Мем */
export interface IMeme {
  /** Идентификатор */
  id: string,
  /** Название */
  name: string,
  /** Ссылка на изображение */
  url: string,
  /** Ширина */
  width: number,
  /** Высота */
  height: number,
  /** Количество текстовых полей */
  box_count: number
}