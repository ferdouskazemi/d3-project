// https://observablehq.com/@mbostock/icelandic-population-by-age-1841-2019@247
import define1 from "./450051d7f1174df8@254.js";
import define2 from "./a33468b95d0b15b0@808.js";

function _1(md){return(
md`# Icelandic Population by Age, 1841–2019

Blue represents surplus male population and red surplus female population. Data: [Statistics Iceland](https://statice.is/about-statistics-iceland/) via [Borgar Þorsteinsson](https://bl.ocks.org/borgar/b952bb581923c9993d68)`
)}

function _year(Scrubber,d3,data,delay){return(
Scrubber(Array.from(d3.group(data, d => d.year), ([key]) => key).sort(d3.ascending), {delay, loop: false})
)}

function _legend(swatches,color){return(
swatches({color, format: x => ({M: "Male", F: "Female"}[x])})
)}

function _chart(d3,width,height,xAxis,yAxis,x,yearMin,yearStep,delay,data,color,y)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  const group = svg.append("g");

  let rect = group.selectAll("rect");

  return Object.assign(svg.node(), {
    update(year) {
      const dx = x.step() * (year - yearMin) / yearStep;

      const t = svg.transition()
          .ease(d3.easeLinear)
          .duration(delay);

      rect = rect
        .data(data.filter(d => d.year === year), d => `${d.sex}:${d.year - d.age}`)
        .join(
          enter => enter.append("rect")
            .style("mix-blend-mode", "darken")
            .attr("fill", d => color(d.sex))
            .attr("x", d => x(d.age) + dx)
            .attr("y", d => y(0))
            .attr("width", x.bandwidth() + 1)
            .attr("height", 0),
          update => update,
          exit => exit.call(rect => rect.transition(t).remove()
            .attr("y", y(0))
            .attr("height", 0))
        );

      rect.transition(t)
          .attr("y", d => y(d.value))
          .attr("height", d => y(0) - y(d.value));

      group.transition(t)
          .attr("transform", `translate(${-dx},0)`);
    }
  });
}


function _5(chart,year){return(
chart.update(year)
)}

function _delay(){return(
250
)}

async function _data(d3,FileAttachment){return(
Object.assign(d3.csvParse(await FileAttachment("icelandic-population.csv").text(), d3.autoType), {x: "← Age", y: "Population ↑"})
)}

function _yearMin(d3,data){return(
d3.min(data, d => d.year)
)}

function _yearStep(){return(
1
)}

function _x(d3,data,width,margin){return(
d3.scaleBand()
    .domain(Array.from(d3.group(data, d => d.age).keys()).sort(d3.ascending))
    .range([width - margin.right, margin.left])
)}

function _y(d3,data,height,margin){return(
d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range([height - margin.bottom, margin.top])
)}

function _color(d3){return(
d3.scaleOrdinal(["M", "F"], ["#4e79a7", "#e15759"])
)}

function _xAxis(height,margin,d3,x,data,width){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x)
        .tickValues(d3.ticks(...d3.extent(data, d => d.age), width / 40))
        .tickSizeOuter(0))
    .call(g => g.append("text")
        .attr("x", margin.right)
        .attr("y", margin.bottom - 4)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text(data.x))
)}

function _yAxis(width,margin,d3,y,data){return(
g => g
    .attr("transform", `translate(${width - margin.right},0)`)
    .call(d3.axisRight(y).ticks(null, "s"))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", margin.right)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text(data.y))
)}

function _height(){return(
500
)}

function _margin(){return(
{top: 20, right: 30, bottom: 34, left: 0}
)}

function _d3(require){return(
require("d3@6")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  // function toString() { return this.url; }
  // main.variable("url").define("url", function() { return "https://observablehq.com/@mbostock/icelandic-population-by-age-1841-2019@247"; });
  const fileAttachments = new Map([["icelandic-population.csv", require("./files/icelandic-population.csv")]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof year")).define("viewof year", ["Scrubber","d3","data","delay"], _year);
  main.variable(observer("year")).define("year", ["Generators", "viewof year"], (G, _) => G.input(_));
  main.variable(observer("legend")).define("legend", ["swatches","color"], _legend);
  main.variable(observer("chart")).define("chart", ["d3","width","height","xAxis","yAxis","x","yearMin","yearStep","delay","data","color","y"], _chart);
  main.variable(observer()).define(["chart","year"], _5);
  main.variable(observer("delay")).define("delay", _delay);
  main.variable(observer("data")).define("data", ["d3","FileAttachment"], _data);
  main.variable(observer("yearMin")).define("yearMin", ["d3","data"], _yearMin);
  main.variable(observer("yearStep")).define("yearStep", _yearStep);
  main.variable(observer("x")).define("x", ["d3","data","width","margin"], _x);
  main.variable(observer("y")).define("y", ["d3","data","height","margin"], _y);
  main.variable(observer("color")).define("color", ["d3"], _color);
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","x","data","width"], _xAxis);
  main.variable(observer("yAxis")).define("yAxis", ["width","margin","d3","y","data"], _yAxis);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child1 = runtime.module(define1);
  main.import("Scrubber", child1);
  const child2 = runtime.module(define2);
  main.import("swatches", child2);
  return main;
}
