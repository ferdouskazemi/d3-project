import { ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Inspector, Runtime } from '@observablehq/runtime';
import define from './86ddbc29bd33f9d6@357';


@Component({
  selector: 'app-zoomable-sunburst',
  templateUrl: './zoomable-sunburst.component.html',
  styleUrls: ['./zoomable-sunburst.component.scss']
})
export class ZoomableSunburstComponent implements OnInit {
  constructor() { }
   htmlStr: any ;

  ngOnInit(): void {
    var elem = document.createElement('div');
    var chart = document.querySelector('#chart-zoomable');
    chart!.appendChild(elem);
    const runtime = new Runtime();
    runtime.module(define, Inspector.into(elem));
  

  }

}
