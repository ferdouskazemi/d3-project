import { Component, OnInit } from '@angular/core';
import { Inspector, Runtime } from '@observablehq/runtime';
import define from '.';

@Component({
  selector: 'app-streamgraph-transitions',
  templateUrl: './streamgraph-transitions.component.html',
  styleUrls: ['./streamgraph-transitions.component.scss']
})
export class StreamgraphTransitionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var elem = document.createElement('div');
    var chart = document.querySelector('#chart-streamgraph');
    chart!.appendChild(elem);
    const runtime = new Runtime();
    runtime.module(define, Inspector.into(elem));
  }

}
