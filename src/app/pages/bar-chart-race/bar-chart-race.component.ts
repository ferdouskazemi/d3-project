import { Component, OnInit } from '@angular/core';
import { Inspector, Runtime } from '@observablehq/runtime';
import define from './3ff9fa2c6593d814@3058';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';


@Component({
  selector: 'app-bar-chart-race',
  templateUrl: './bar-chart-race.component.html',
  styleUrls: ['./bar-chart-race.component.scss']
})
 export class BarChartRaceComponent implements OnInit {


  userArray: BarChart[] = [];
  arrayBuffer:any;
  constructor(private http: HttpClient) {
   }

  async ngOnInit(): Promise<void> {

    this.http.get('assets/category-brands.csv', { responseType: 'text' }).subscribe(
      (data) => {
        let csvToRowArray = data.split('\n');
        for (let index = 1; index < csvToRowArray.length - 1; index++) {
          let row = csvToRowArray[index].split(',');
          this.userArray.push(
            new BarChart(
              parseInt(row[0], 10),
              row[1],
              row[2].trim(),
              parseInt(row[3].trim())
            )
          );
        }
        localStorage.setItem('userArray', JSON.stringify(this.userArray));
        console.log(this.userArray);
      },
      (error) => {
        console.log(error);
      }
    );


    // const FileAttachment = await d3.csv("./files/category-brands.csv")
    // console.log("FileAttachment");
    // console.log(FileAttachment);

    var elem = document.createElement('div');
    elem.style.cssText = 'widht:80%; height:fit-content; padding: 20px;margin:auto;';
    var chart = document.querySelector('#chart-bar-chart-race');
    chart!.appendChild(elem);
    const runtime = new Runtime();
    runtime.module(define, Inspector.into(elem));
  }

  


}



export class BarChart {
  date: number;
  name: String;
  category: String;
  value: number;

  constructor(date: number, name: String, category: String, value: number) {
    this.date = date;
    this.name = name;
    this.category = category;
    this.value = value;
  }
}
