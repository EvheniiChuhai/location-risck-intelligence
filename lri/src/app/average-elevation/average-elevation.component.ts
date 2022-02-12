import { Component, OnInit } from '@angular/core';
import {Select} from "@ngxs/store";
import {GeoDataState} from "../+state/state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-average-elevation',
  templateUrl: './average-elevation.component.html',
  styleUrls: ['./average-elevation.component.scss']
})
export class AverageElevationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Select(GeoDataState.averageElevation) averageElevation$: Observable<number>
}
