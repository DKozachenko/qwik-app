import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import * as olProj from 'ol/proj';
import { MapBrowserEvent } from "ol";
import { Coordinate } from "ol/coordinate";
import { routeAction$ } from "@builder.io/qwik-city";
import { apiUrl } from "./models/constants";
import { IApiResult } from "./models/interfaces";

const useSunResult = routeAction$(async (data: any) => {
  const coordinates: Coordinate = data as Coordinate;
  
  const url: string = `${apiUrl}/json?lat=${coordinates[1]}&lng=${coordinates[0]}`;
  console.warn(url);
  const response = await fetch(url);
  const result: any = response.json();
  return result as IApiResult;
});

export default component$(() => {
  let map: Map | null = null;
  const currentCoordinates = useSignal<Coordinate | null>(null);
  const sunResult = useSunResult();

  useVisibleTask$(() => {
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        })
      ],
      view: new View({
        center: olProj.fromLonLat([37.6156, 55.7522]),
        zoom: 5
      })
    });

    map.on('click', async (event: MapBrowserEvent<any>) => {
      const coordinates: Coordinate = olProj.toLonLat(event.coordinate);
      currentCoordinates.value = coordinates;
      const requestCoordinates = [ +currentCoordinates.value[0].toFixed(7), +currentCoordinates.value[1].toFixed(7) ];
      await sunResult.submit(requestCoordinates);
    });
  });
  

  return (
    <section class="flex">
      <div id="map" class="w-4/6" style="height: calc(100vh - 77px)"></div>
      <div class="w-2/6 p-3">
        <p>Coordinates of clicked point:</p>
        <p>Latitude { currentCoordinates?.value?.[1] }</p>
        <p>Longitude { currentCoordinates?.value?.[0] }</p>

        <p>Sunset at 
          {sunResult.isRunning && (
            <span> Executing action</span>
          )}

          {sunResult.value?.results && !sunResult.isRunning && (
            <span class="font-bold"> { sunResult.value.results.sunset } (UTC)</span>
          )}
        </p>

        <p>Sunrise at
          {sunResult.isRunning && (
            <span> Executing action</span>
          )}

          {sunResult.value?.status === "OK" && !sunResult.isRunning && (
            <span class="font-bold"> { sunResult.value.results.sunrise } (UTC)</span>
          )}
        </p>
      </div>
    </section>
  );
});
