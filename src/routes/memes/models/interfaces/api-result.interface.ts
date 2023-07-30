import { IMeme } from "./meme.interface";

export interface IApiResult {
  success: true,
  data: {
    memes: IMeme[]
  }
}