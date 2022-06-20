import { Component, OnInit } from '@angular/core';
import { Inspector, Runtime } from '@observablehq/runtime';
import define from './0b07c3790ae4af2c@330';

@Component({
  selector: 'app-hierarchical-bar-chart',
  templateUrl: './hierarchical-bar-chart.component.html',
  styleUrls: ['./hierarchical-bar-chart.component.scss']
})
export class HierarchicalBarChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    var elem = document.createElement('div');
    // elem.style.cssText = '';
    var chart = document.querySelector('#chart-hierarchical-bar-chart');
    chart!.appendChild(elem);
    const runtime = new Runtime();
    runtime.module(define, Inspector.into(elem));
  }

}
