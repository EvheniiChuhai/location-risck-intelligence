import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GeoData} from "./+state/state";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GeoDataService {

  private readonly geoDataUrl = `https://elevation.arcgis.com/arcgis/rest/services/Tools/ElevationSync/GPServer/Prof
ile/execute?InputLineFeatures=%7B%22fields%22%3A%5B%7B%22name%22%3A%22OID%22%2C%22t
ype%22%3A%22esriFieldTypeObjectID%22%2C%22alias%22%3A%22OID%22%7D%5D%2C%22geometryT
ype%22%3A%22esriGeometryPolyline%22%2C%22features%22%3A%5B%7B%22geometry%22%3A%7B%2
2paths%22%3A%5B%5B%5B10.464200935945678%2C45.51541916225363%5D%2C%5B11.021070442780
866%2C45.881334972376145%5D%5D%5D%2C%22spatialReference%22%3A%7B%22wkid%22%3A4326%7
D%7D%2C%22attributes%22%3A%7B%22OID%22%3A1%7D%7D%5D%2C%22sr%22%3A%7B%22wkid%22%3A43
26%7D%7D&ProfileIDField=OID&DEMResolution=90m&MaximumSampleDistance=425.56448498622
03&MaximumSampleDistanceUnits=Meters&returnZ=true&returnM=true&f=json`

  constructor(private http: HttpClient) {
  }

  getGeoData(): Observable<GeoData> {
    return this.http.get<GeoData>(this.geoDataUrl);
  }
}
