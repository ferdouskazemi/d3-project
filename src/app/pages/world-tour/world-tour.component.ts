import { Component, OnInit } from '@angular/core';
import { Inspector, Runtime } from '@observablehq/runtime';
import define from './0e9181d646defd6c@238';


@Component({
  selector: 'app-world-tour',
  templateUrl: './world-tour.component.html',
  styleUrls: ['./world-tour.component.scss']
})
export class WorldTourComponent implements OnInit {
  

  constructor() { }

  ngOnInit(): void {

    var elem = document.createElement('div');
    var chart = document.querySelector('#chart-world-tour');
    chart!.appendChild(elem);
    const runtime = new Runtime();
    runtime.module(define, Inspector.into(elem));
  }

}
