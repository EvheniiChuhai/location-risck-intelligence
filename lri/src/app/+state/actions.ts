import {GeoData} from "./state";

export class LoadGeoData {
  static readonly type = '[GeoAPI] Load Geo Data';
}

export class SetGeoData {
  static readonly type = '[GeoAPI] Set Geo Data'
  constructor(public payload: GeoData ) {
  }
}
