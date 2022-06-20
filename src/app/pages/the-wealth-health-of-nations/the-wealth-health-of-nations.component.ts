import { Component, OnInit } from '@angular/core';
import { Inspector, Runtime } from '@observablehq/runtime';
import * as d3 from 'd3';
import define from './ee2086412849cb2d@202';


@Component({
  selector: 'app-the-wealth-health-of-nations',
  templateUrl: './the-wealth-health-of-nations.component.html',
  styleUrls: ['./the-wealth-health-of-nations.component.scss']
})
export class TheWealthHealthOfNationsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var elem = document.createElement('div');
    var chart = document.querySelector('#chart-wealth-health');
    chart!.appendChild(elem);
    const runtime = new Runtime();
    runtime.module(define, Inspector.into(elem));
  }

}
