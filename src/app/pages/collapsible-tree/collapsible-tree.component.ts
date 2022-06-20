import { Component, OnInit } from '@angular/core';
import { Inspector, Runtime } from '@observablehq/runtime';
import * as d3 from 'd3';
import define from './e257f81c745be447@360';

@Component({
  selector: 'app-collapsible-tree',
  templateUrl: './collapsible-tree.component.html',
  styleUrls: ['./collapsible-tree.component.scss']
})
export class CollapsibleTreeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var elem = document.createElement('div');
    // elem.style.cssText = '';
    var chart = document.querySelector('#chart-coolapsible');
    chart!.appendChild(elem);
    const runtime = new Runtime();
    runtime.module(define, Inspector.into(elem));
  }

}
