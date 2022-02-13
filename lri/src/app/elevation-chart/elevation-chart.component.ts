import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Plotly} from "angular-plotly.js/lib/plotly.interface";


@Component({
  selector: 'app-elevation-chart',
  templateUrl: './elevation-chart.component.html',
  styleUrls: ['./elevation-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElevationChartComponent implements OnInit {
  @Input() paths: [number, number][];
  chartData: Plotly.Data;

  constructor() {}

  ngOnInit() {

  }
  ngOnChanges() {
    if(this.paths){
    this.chartData = {
      data: [{
        x: this.paths.map((e) => e[0]),
        y: this.paths.map((e) => e[1]),
        type: 'scatter]'
      }],
      layout: {title: 'Highlighted Elevation Data'}
    }
    }
  }

}
