import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import * as olProj from "ol/proj";
import { MapBrowserEvent } from "ol";
import { Coordinate } from "ol/coordinate";
import { routeAction$ } from "@builder.io/qwik-city";
import { apiGeocoderUrl, apiSunUrl, apiTimeUrl, coordinatesKey, zoomKey } from "./models/constants";
import {
  IApiGeocoderResult,
  IApiSunResult,
  IApiTimeResult,
} from "./models/interfaces";
import { LuMapPin, LuSunset, LuCopy, LuSunrise, LuGlobe } from "@qwikest/icons/lucide";
import { formatInTimeZone } from 'date-fns-tz';

const useSunResult = routeAction$(async (data: any) => {
  const coordinates: Coordinate = data as Coordinate;

  const url: string = `${apiSunUrl}/json?lat=${coordinates[1]}&lng=${coordinates[0]}`;
  const response = await fetch(url);
  const result: any = await response.json();
  return result as IApiSunResult;
});

const useGeocoderResult = routeAction$(async (data: any) => {
  const coordinates: Coordinate = data as Coordinate;

  const url: string = `${apiGeocoderUrl}/reverse?lat=${coordinates[1].toFixed(4)}&lon=${coordinates[0].toFixed(4)}`;
  const response = await fetch(url);
  const result: any = await response.json();
  return result as IApiGeocoderResult;
});

const useTimeResult = routeAction$(async (data: any) => {
  const coordinates: Coordinate = data as Coordinate;

  const url: string = `${apiTimeUrl}/?latitude=${coordinates[1].toFixed(4)}&longitude=${coordinates[0].toFixed(4)}`;
  const response = await fetch(url);
  const result: any = await response.json();
  return result as IApiTimeResult;
});

export default component$(() => {
  const currentCoordinates = useSignal<Coordinate | null>(null);
  const sunResult = useSunResult();
  const geocoderResult = useGeocoderResult();
  const timeResult = useTimeResult();

  const getFormattedLocalTime = (utcTime: string, timezoneName: string) => {
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

  const copy = $(async () => {
    await navigator.clipboard.writeText(`${currentCoordinates.value?.[1].toFixed(6)},${currentCoordinates.value?.[0].toFixed(6)}`);
  });

  useVisibleTask$(() => {
    const lastCoordinates: Coordinate | undefined = localStorage.getItem(coordinatesKey) 
      ? JSON.parse(localStorage.getItem(coordinatesKey) ?? '')
      : undefined;
    const lastZoom: number | undefined = localStorage.getItem(zoomKey) 
      ? JSON.parse(localStorage.getItem(zoomKey) ?? '')
      : undefined;

    const map: Map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
          }),
        }),
      ],
      view: new View({
        center: olProj.fromLonLat(lastCoordinates ?? [37.6156, 55.7522]),
        zoom: lastZoom ?? 5,
      }),
    });

    map.on("click", async (event: MapBrowserEvent<any>) => {
      const coordinates: Coordinate = olProj.toLonLat(event.coordinate);
      currentCoordinates.value = coordinates;
      const requestCoordinates = [
        +currentCoordinates.value[0].toFixed(7),
        +currentCoordinates.value[1].toFixed(7),
      ];

      const zoom: number = map.getView().getZoom() as number;
      localStorage.setItem(coordinatesKey, JSON.stringify(coordinates));
      localStorage.setItem(zoomKey, zoom.toString());
      await sunResult.submit(requestCoordinates);
      await geocoderResult.submit(requestCoordinates);
      await timeResult.submit(requestCoordinates);
    });
  });

  return (
    <section class="relative">
      <div id="map" class="w-100" style="height: calc(100vh - 77px)"></div>

      <div style="transform: translateX(-50%)" class="absolute top-0 left-1/2 p-2 bg-white w-1/2 h-48 overflow-x-auto flex items-center">
        <div class="flex flex-col gap-4">
          { currentCoordinates.value 
            ? (
              <p class="flex items-center gap-3">
                <LuMapPin class="text-2xl" />

                <span>
                  { currentCoordinates.value?.[1].toFixed(6)},{" "}
                  { currentCoordinates.value?.[0].toFixed(6)}
                </span>

                <LuCopy class="text-3xl border border-black rounded p-1 transition-colors duration-300 ease-in-out hover:cursor-pointer hover:bg-amber-200 active:bg-amber-500"
                onClick$={copy} />
              </p>
            )
          : (
              <p>Click to see information</p>
            )
        }

          { sunResult.value && geocoderResult.value && timeResult.value && (
            <>
              <p class="flex flex-col gap-4">
                <span class="flex gap-3">
                  <LuSunrise class="text-2xl" />

                  <span>Sunrise: { getFormattedLocalTime(sunResult.value.results?.sunrise!, timeResult.value.timeZone!) }</span>
                </span>
                
                <span class="flex gap-3">
                  <LuSunset class="text-2xl" />

                  <span>Sunset: { getFormattedLocalTime(sunResult.value.results?.sunset!, timeResult.value.timeZone!) }</span>
                </span>
              </p>

              <p class="flex items-center gap-3">
                <LuGlobe style="min-width: 24px;" class="text-2xl" />

                <span style="word-break: break-word;">{ geocoderResult.value.display_name }</span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
});
