import { Coordinate } from "ol/coordinate";
import { IApiSunResult } from "../models/interfaces";
import { apiSunUrl } from "../models/constants";
import { baseHook } from "~/hooks";

/** Хук на получение данных о закате и восходе */
export const sunHook = async (data: any) => {
  const coordinates: Coordinate = data as Coordinate;

  const url: string = `${apiSunUrl}/json?lat=${coordinates[1]}&lng=${coordinates[0]}`;
  return baseHook<IApiSunResult>(url);
};