import { Component, OnInit } from '@angular/core';
import { Inspector, Runtime } from '@observablehq/runtime';
import define from './e93997d5089d7165@2303';


@Component({
  selector: 'app-world-history-timeline',
  templateUrl: './world-history-timeline.component.html',
  styleUrls: ['./world-history-timeline.component.scss']
})
export class WorldHistoryTimelineComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    var elem = document.createElement('div');
    var chart = document.querySelector('#chart-world-history-timeline');
    chart!.appendChild(elem);
    const runtime = new Runtime();
    runtime.module(define, Inspector.into(elem));
  }

}
