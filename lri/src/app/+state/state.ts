import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {GeoDataService} from "../geodata.service";
import {LoadGeoData} from "./actions";
import {tap} from "rxjs";

export interface SpatialReference {
  wkid: number;
  latestWkid: number;
}

export interface Field {
  name: string;
  type: string;
  alias: string;
  length?: number;
}

export interface Attributes {
  OBJECTID: number;
  DEMResolution: string;
  ProductName: string;
  Source: string;
  Source_URL: string;
  ProfileLength: number;
  Shape_Length: number;
}

export interface Geometry {
  hasZ: boolean;
  hasM: boolean;
  paths: [[number[]]];
}

export interface Feature {
  attributes: Attributes;
  geometry: Geometry;
}

export interface Value {
  displayFieldName: string;
  hasZ: boolean;
  hasM: boolean;
  geometryType: string;
  spatialReference: SpatialReference;
  fields: Field[];
  features: Feature[];
  exceededTransferLimit: boolean;
}

export interface Result {
  paramName: string;
  dataType: string;
  value: Value;
}

export interface GeoData {
  results: Result[];
  messages: any[];
}


@State<GeoData>({
  name: 'GeoData',
  defaults: {} as GeoData
})
@Injectable()
export class GeoDataState {

  constructor(private readonly geoService: GeoDataService) {
  }

  @Selector()
  static elevationPoints(state: GeoData): [number, number][] {
    return state.results[0].value.features[0].geometry.paths[0].map((pointArr) =>
      [pointArr[3], pointArr[2]]);
  }

  @Selector()
  static averageElevation(state: GeoData): number {
    const paths = state.results[0].value.features[0].geometry.paths[0]
    const averageElevation = paths.reduce((accumulator, value) => accumulator + value[2], 0)
    return averageElevation / paths.length;
  }

  @Selector()
  static maxElevation(state: GeoData): number {
    const paths = state.results[0].value.features[0].geometry.paths[0].map((pointsArr) => pointsArr[2])
    return paths.reduce((accumulator, currentValue) => accumulator > currentValue ? accumulator : currentValue)

  }

  @Action(LoadGeoData, { cancelUncompleted: true })
  loadGeoData({patchState}: StateContext<GeoDataState>) {

    return this.geoService.getGeoData().pipe(
      tap((geoData) => {
        patchState({...geoData});
      })
    )
  }

}
