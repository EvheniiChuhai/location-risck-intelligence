import {Component, OnInit} from '@angular/core';
import {Select} from "@ngxs/store";
import {GeoDataState} from "../+state/state";
import {Observable} from "rxjs";


@Component({
  selector: 'app-elevation-chart',
  templateUrl: './elevation-chart.component.html',
  styleUrls: ['./elevation-chart.component.scss']
})
export class ElevationChartComponent implements OnInit {
  value: [number, number][] = [[0,0]];


  constructor() { }

  ngOnInit(): void {

    this.elevationPoints$.subscribe(
      res => this.value = res
    )
  }

  @Select(GeoDataState.elevationPoints) elevationPoints$: Observable<[number, number][]>

}
