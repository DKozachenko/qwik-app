import { baseHook } from "~/hooks";
import { apiUrl } from "../models/constants";
import { IApiResult } from "../models/interfaces";

export const memesHook = async () => {
  const url: string = `${apiUrl}/get_memes`;
  return baseHook<IApiResult>(url);
}