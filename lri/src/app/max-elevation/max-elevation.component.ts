import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Select} from "@ngxs/store";
import {GeoDataState} from "../+state/state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-max-elevation',
  templateUrl: './max-elevation.component.html',
  styleUrls: ['./max-elevation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaxElevationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Select(GeoDataState.maxElevation) maxElevation$: Observable<number[]>;
  @Select(GeoDataState.maxDistance) maxDistance$: Observable<number>;
}
