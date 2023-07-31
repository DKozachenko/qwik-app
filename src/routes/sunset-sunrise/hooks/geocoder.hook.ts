import { Coordinate } from "ol/coordinate";
import { apiGeocoderUrl } from "../models/constants";
import { IApiGeocoderResult } from "../models/interfaces";
import { baseHook } from "~/hooks";

/** Хук на получение гео-данных */
export const geocoderHook = async (data: any) => {
  const coordinates: Coordinate = data as Coordinate;

  const url: string = `${apiGeocoderUrl}/reverse?lat=${coordinates[1].toFixed(4)}&lon=${coordinates[0].toFixed(4)}`;
  return baseHook<IApiGeocoderResult>(url);
}