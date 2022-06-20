import { Component, OnInit } from '@angular/core';
import { Inspector, Runtime } from '@observablehq/runtime';
import define from './6705012ea4863d3f@258';
@Component({
  selector: 'app-temporal-force-directed-graph',
  templateUrl: './temporal-force-directed-graph.component.html',
  styleUrls: ['./temporal-force-directed-graph.component.scss']
})
export class TemporalForceDirectedGraphComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    var elem = document.createElement('div');
    // elem.style.cssText = '';
    var chart = document.querySelector('#chart-temporal-force-directed-graph');
    chart!.appendChild(elem);
    const runtime = new Runtime();
    runtime.module(define, Inspector.into(elem));

  }

}
