import { Component, OnInit } from '@angular/core';
import { Inspector, Runtime } from '@observablehq/runtime';
import define from './5831f55fccfa1c41@165.js';

@Component({
  selector: 'app-zoomable-circle-packing',
  templateUrl: './zoomable-circle-packing.component.html',
  styleUrls: ['./zoomable-circle-packing.component.scss']
})
export class ZoomableCirclePackingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    var elem = document.createElement('div');
    var chart = document.querySelector('#chart-zoomable-circle-packing');
    chart!.appendChild(elem);
    const runtime = new Runtime();
    runtime.module(define, Inspector.into(elem));
  }

}
