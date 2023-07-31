import { IMathForm } from "./math-form.interface";

/** Ответ от API */
export interface IApiResult extends IMathForm {
  /** Результат */
  result: string
}