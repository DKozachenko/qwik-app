import { Coordinate } from "ol/coordinate";

export const baseHook = async <T>(apiUrl: string) => {
  const response = await fetch(apiUrl);
  const result: any = await response.json();
  return result as T;
}