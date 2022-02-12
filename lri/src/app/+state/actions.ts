import {GeoData} from "./state";

export class LoadGeoData {
  static readonly type = '[Geo] Load Geo Data';
}

export class SetGeoData {
  static readonly type = '[Geo] Set Geo Data'
  constructor(public payload: GeoData ) {
  }
}
