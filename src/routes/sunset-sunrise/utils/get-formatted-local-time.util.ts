import { formatInTimeZone } from "date-fns-tz";

/** Получение локального времени в формате HH:mm:ss (XXX), где (ХХХ) смещение по UTC */
export const getFormattedLocalTime = (utcTime: string, timezoneName: string) => {
  const regex: RegExp = /(\d+):(\d+):(\d+) (AM|PM)/;
  const groups: RegExpExecArray | null = regex.exec(utcTime);
  
  let hours: number = +(groups?.[1] ?? 0);
  if (groups?.[4] === "PM" && hours < 12) {
    hours += 12;
  }
  if (groups?.[4] === "AM" && hours == 12) {
    hours -= 12;
  }

  const minutes: number = +(groups?.[2] ?? 0);
  const seconds: number = +(groups?.[3] ?? 0);

  const fakeDate: Date = new Date(Date.UTC(1970, 0, 1, hours, minutes, seconds));

  return formatInTimeZone(fakeDate, timezoneName, 'HH:mm:ss (XXX)');
}