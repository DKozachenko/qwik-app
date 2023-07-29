export interface IApiGeocoderResult {
  place_id: number,
  licence: string,
  powered_by: string,
  osm_type: string,
  osm_id: number,
  lat: number,
  lon: number,
  display_name: string,
  address: Partial<{
    tourism: string,
    amenity: string,
    road: string,
    quarter: string,
    suburb: string,
    city: string,
    state: string,
    region: string,
    postcode: string,
    country: string,
    country_code: string,
    house_number: string,
    building: string
  }>,
  boundingbox: string[]
}