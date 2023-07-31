import { baseHook } from "~/hooks";
import { apiUrl } from "../models/constants";
import { IApiResult } from "../models/interfaces";

/** Хук на получение мемов */
export const memesHook = async () => {
  const url: string = `${apiUrl}/get_memes`;
  return baseHook<IApiResult>(url);
}