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

export interface GeoDataStateModel {
  paths: [number, number][];
  profileLength: number;
}


@State<GeoDataStateModel>({
  name: 'GeoData',
  defaults: {
    paths: [[0,0]],
    profileLength: 6000,
  }
})
@Injectable()
export class GeoDataState {

  constructor(private readonly geoService: GeoDataService) {
  }

  @Selector()
  static elevationPoints(state: GeoDataStateModel):  number[] {
    return state.paths.map((pointArr) => pointArr[1]);
  }

  @Selector()
  static paths(state: GeoDataStateModel): [number, number][] {
    return state.paths;
  }

  @Selector()
  static distancePoints(state: GeoDataStateModel): number[] {
    return state.paths.map((pointArr) => pointArr[0]);
  }

  @Selector()
  static maxDistance(state: GeoDataStateModel): number {
    return state.profileLength;
  }

  @Selector()
  static averageElevation(state: GeoDataStateModel): number {
    const averageElevation = state.paths.reduce((accumulator, value) => accumulator + value[1], 0);
    return averageElevation / state.paths.length;
  }

  @Selector()
  static maxElevation(state: GeoDataStateModel): number {
    const paths = state.paths.map((pointsArr) => pointsArr[1]);
    return paths.reduce((accumulator, currentValue) => accumulator > currentValue ? accumulator : currentValue);

  }

  @Action(LoadGeoData, {cancelUncompleted: true})
  loadGeoData(ctx: StateContext<GeoDataStateModel>) {

    return this.geoService.getGeoData().pipe(
      tap((geoData) => {
        const state = ctx.getState();
        const paths: [number, number][] = geoData.results[0].value.features[0].geometry.paths[0].map((pointArr) =>
          [pointArr[3], pointArr[2]]);
        const profileLength = geoData.results[0].value.features[0].attributes.ProfileLength;
        ctx.setState({...state, paths, profileLength});
      })
    )
  }

}
