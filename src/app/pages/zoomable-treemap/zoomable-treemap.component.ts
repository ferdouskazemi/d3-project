import { Component, OnInit } from '@angular/core';
import { Inspector, Runtime } from '@observablehq/runtime';
import define from './dffe0d34a20a472b@400';
@Component({
  selector: 'app-zoomable-treemap',
  templateUrl: './zoomable-treemap.component.html',
  styleUrls: ['./zoomable-treemap.component.scss']
})
export class ZoomableTreemapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {


    var elem = document.createElement('div');
    var chart = document.querySelector('#chart-zoomable-treemap');
    chart!.appendChild(elem);
    const runtime = new Runtime();
    runtime.module(define, Inspector.into(elem));

  }

}
