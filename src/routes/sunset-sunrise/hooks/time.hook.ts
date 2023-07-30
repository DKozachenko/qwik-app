import { Coordinate } from "ol/coordinate";
import { apiTimeUrl } from "../models/constants";
import { IApiTimeResult } from "../models/interfaces";
import { baseHook } from "./base.hook";

export const timeHook = async (data: any) => {
  const coordinates: Coordinate = data as Coordinate;

  const url: string = `${apiTimeUrl}/?latitude=${coordinates[1].toFixed(4)}&longitude=${coordinates[0].toFixed(4)}`;
  return baseHook<IApiTimeResult>(url);
}