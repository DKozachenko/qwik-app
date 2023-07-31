import { IMeme } from "./meme.interface";

/** Ответ от API */
export interface IApiResult {
  /** Успех */
  success: true,
  /** Данные */
  data: {
    /** Мемы */
    memes: IMeme[]
  }
}