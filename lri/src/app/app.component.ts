import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GeoDataService} from "./geodata.service";
import {fromEvent,  Subject, switchMap, takeUntil} from "rxjs";
import {Store} from "@ngxs/store";
import {LoadGeoData} from "./+state/actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'lri';
  @ViewChild('requestElevation', {static: true}) requestElevation: ElementRef;
  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient, private geoService: GeoDataService, private store: Store) {
  }

  ngOnInit() {
    fromEvent(this.requestElevation.nativeElement, 'click').pipe(
      takeUntil(this.destroy$),
      switchMap(() => this.store.dispatch(new LoadGeoData())),
    ).subscribe()
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
