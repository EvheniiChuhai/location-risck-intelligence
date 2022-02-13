import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GeoDataService} from "./geodata.service";
import {fromEvent, Observable, Subject, switchMap, takeUntil} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {LoadGeoData} from "./+state/actions";
import {GeoDataState} from "./+state/state";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'lri';
  @ViewChild('requestElevation', {static: true}) requestElevation: ElementRef;
  private destroy$ = new Subject<void>();
  test: [number, number][];
  constructor(private http: HttpClient, private geoService: GeoDataService, private store: Store) {
  }

  ngOnInit() {
    fromEvent(this.requestElevation.nativeElement, 'click').pipe(
      takeUntil(this.destroy$),
      switchMap(() => this.store.dispatch(new LoadGeoData())),
    ).subscribe()
  }

  @Select(GeoDataState.elevationPoints) elevationPoints$: Observable< number[]>;
  @Select(GeoDataState.distancePoints) distancePoints$: Observable< number[]>;
  @Select(GeoDataState.paths) paths$: Observable<[number, number][]>

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
