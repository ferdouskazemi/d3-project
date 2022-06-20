import { Component, OnInit } from '@angular/core';
import { Inspector, Runtime } from '@observablehq/runtime';
import define from './4148d814f94a4c11@247';

@Component({
  selector: 'app-icelandic-population',
  templateUrl: './icelandic-population.component.html',
  styleUrls: ['./icelandic-population.component.scss']
})
export class IcelandicPopulationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    var elem = document.createElement('div');
    var chart = document.querySelector('#chart-icelandic-population');
    chart!.appendChild(elem);
    const runtime = new Runtime();
    runtime.module(define, Inspector.into(elem));
  }

}
