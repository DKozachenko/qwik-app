import { Operation } from '../types/operation.type';

/** Форма */
export interface IMathForm {
  /** Операция */
  operation: Operation,
  /** Выражение */
  expression: string
}