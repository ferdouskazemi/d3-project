// https://observablehq.com/@mbostock/walmarts-growth@333
import define1 from "./450051d7f1174df8@254.js";

function _1(md){return(
md
)}

function _date(Scrubber,d3,data){return(
Scrubber(d3.utcWeek.every(2).range(...d3.extent(data, d => d.date)), {format: d3.utcFormat("%Y %b %-d"), loop: false})
)}

function _chart(d3,topojson,us,data)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, 960, 600]);

  svg.append("path")
      .datum(topojson.merge(us, us.objects.lower48.geometries))
      .attr("fill", "#ddd")
      .attr("d", d3.geoPath());

  svg.append("path")
      .datum(topojson.mesh(us, us.objects.lower48, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", d3.geoPath());

  const g = svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "black");

  const dot = g.selectAll("circle")
    .data(data)
    .join("circle")
      .attr("transform", d => `translate(${d})`);

  svg.append("circle")
      .attr("fill", "blue")
      .attr("transform", `translate(${data[0]})`)
      .attr("r", 3);

  let previousDate = -Infinity;

  return Object.assign(svg.node(), {
    update(date) {
      dot // enter
        .filter(d => d.date > previousDate && d.date <= date)
        .transition().attr("r", 3);
      dot // exit
        .filter(d => d.date <= previousDate && d.date > date)
        .transition().attr("r", 0);
      previousDate = date;
    }
  });
}


function _update(chart,date){return(
chart.update(date)
)}

async function _data(FileAttachment,projection,parseDate){return(
(await FileAttachment("walmart.tsv").tsv())
  .map(d => {
    const p = projection(d);
    p.date = parseDate(d.date);
    return p;
  })
  .sort((a, b) => a.date - b.date)
)}

function _parseDate(d3){return(
d3.utcParse("%m/%d/%Y")
)}

function _projection(d3){return(
d3.geoAlbersUsa().scale(1280).translate([480, 300])
)}

async function _us(d3)
{
  const us = await d3.json("https://cdn.jsdelivr.net/npm/us-atlas@1/us/10m.json");
  us.objects.lower48 = {
    type: "GeometryCollection",
    geometries: us.objects.states.geometries.filter(d => d.id !== "02" && d.id !== "15")
  };
  return us;
}


function _topojson(require){return(
require("topojson-client@3")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  // const fileAttachments = new Map([
  //   ["walmart.tsv", {url: new URL("./files/ce607f28cac52d17fe11f7a2dcff0a21c3b74465957841bc8ac390b900fae923b824a86762af12f1a96e0213d613636092a65c611bd6b256b4e729106d4612fe.tsv", import.meta.url), mimeType: "text/tab-separated-values", toString}]
  // ]);

  //  const fileAttachments = new Map([["walmart.tsv", require("./files/ce607f28cac52d17fe11f7a2dcff0a21c3b74465957841bc8ac390b900fae923b824a86762af12f1a96e0213d613636092a65c611bd6b256b4e729106d4612fe.tsv")]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof date")).define("viewof date", ["Scrubber","d3","data"], _date);
  main.variable(observer("date")).define("date", ["Generators", "viewof date"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["d3","topojson","us","data"], _chart);
  main.variable(observer("update")).define("update", ["chart","date"], _update);
  main.variable(observer("data")).define("data", ["FileAttachment","projection","parseDate"], _data);
  main.variable(observer("parseDate")).define("parseDate", ["d3"], _parseDate);
  main.variable(observer("projection")).define("projection", ["d3"], _projection);
  main.variable(observer("us")).define("us", ["d3"], _us);
  main.variable(observer("topojson")).define("topojson", ["require"], _topojson);
  const child1 = runtime.module(define1);
  main.import("Scrubber", child1);
  return main;
}
