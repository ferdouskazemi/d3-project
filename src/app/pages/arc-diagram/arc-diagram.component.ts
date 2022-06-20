import { Component, OnInit } from '@angular/core';
import { Inspector, Runtime } from '@observablehq/runtime';
import define from './5bdfd79e1ffdc48c@277';

@Component({
  selector: 'app-arc-diagram',
  templateUrl: './arc-diagram.component.html',
  styleUrls: ['./arc-diagram.component.scss']
})
export class ArcDiagramComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var elem = document.createElement('div');
    var chart = document.querySelector('#chart-arc-diagram');
    chart!.appendChild(elem);
    const runtime = new Runtime();
    runtime.module(define, Inspector.into(elem));
  }

}
