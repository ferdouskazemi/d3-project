import { Component, OnInit } from '@angular/core';

import { Inspector, Runtime } from '@observablehq/runtime';
import define from './f79e753129e696f0@153';
@Component({
  selector: 'app-scatterplot-tour',
  templateUrl: './scatterplot-tour.component.html',
  styleUrls: ['./scatterplot-tour.component.scss']
})
export class ScatterplotTourComponent implements OnInit {

  
  constructor() { }

  ngOnInit(): void {

    var elem = document.createElement('div');
    // elem.style.cssText = '';
    var chart = document.querySelector('#chart-scatterplot-tour');
    chart!.appendChild(elem);
    const runtime = new Runtime();
    runtime.module(define, Inspector.into(elem));
  }

}
