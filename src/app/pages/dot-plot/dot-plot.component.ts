import { Component, OnInit } from '@angular/core';
import { Inspector, Runtime } from '@observablehq/runtime';
import define from './83dac3a4bf2a6b15@795';


@Component({
  selector: 'app-dot-plot',
  templateUrl: './dot-plot.component.html',
  styleUrls: ['./dot-plot.component.scss']
})
export class DotPlotComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {


    var elem = document.createElement('div');
    var chart = document.querySelector('#chart-dot-plot');
    chart!.appendChild(elem);
    const runtime = new Runtime();
    runtime.module(define, Inspector.into(elem));

  }

}
