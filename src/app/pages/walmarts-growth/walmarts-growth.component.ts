import { Component, OnInit } from '@angular/core';
import { Inspector, Runtime } from '@observablehq/runtime';
import define from './9fc7a290cf64994b@333.js';



@Component({
  selector: 'app-walmarts-growth',
  templateUrl: './walmarts-growth.component.html',
  styleUrls: ['./walmarts-growth.component.scss']
})
export class WalmartsGrowthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    var elem = document.createElement('div');
    var chart = document.querySelector('#chart-walmarts-growth');
    chart!.appendChild(elem);
    const runtime = new Runtime();
    runtime.module(define, Inspector.into(elem));
  }

}
