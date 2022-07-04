import { Component, OnInit } from '@angular/core';
import { Inspector, Runtime } from '@observablehq/runtime';
import define from './9bcde4cc5ba575eb@638';


@Component({
  selector: 'app-streamgraph',
  templateUrl: './streamgraph.component.html',
  styleUrls: ['./streamgraph.component.scss']
})
export class StreamgraphComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    var elem = document.createElement('div');
    var chart = document.querySelector('#chart-streamgraph');
    chart!.appendChild(elem);
    const runtime = new Runtime();
    runtime.module(define, Inspector.into(elem));
  }

}
