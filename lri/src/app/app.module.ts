import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ElevationChartComponent } from './elevation-chart/elevation-chart.component';
import { AverageElevationComponent } from './average-elevation/average-elevation.component';
import { MaxElevationComponent } from './max-elevation/max-elevation.component';
import {HttpClientModule} from "@angular/common/http";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {NgxsModule} from "@ngxs/store";
import {GeoDataState} from "./+state/state";
import {environment} from "../environments/environment";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PlotlyModule} from "angular-plotly.js";
import * as PlotlyJS from 'plotly.js-dist-min';


PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    ElevationChartComponent,
    AverageElevationComponent,
    MaxElevationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxsModule.forRoot([GeoDataState], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    BrowserAnimationsModule,
    PlotlyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
