// https://observablehq.com/@d3/streamgraph-transitions@144
function _1(md){return(
md
)}

function _offset(d3,html)
{
  const options = [
    {name: "d3.stackOffsetExpand", value: d3.stackOffsetExpand},
    {name: "d3.stackOffsetNone", value: d3.stackOffsetNone},
    {name: "d3.stackOffsetSilhouette", value: d3.stackOffsetSilhouette},
    {name: "d3.stackOffsetWiggle", value: d3.stackOffsetWiggle, selected: true}
  ];
  const form = html`<form style="display: flex; align-items: center; min-height: 33px;"><select name=i>${options.map(o => Object.assign(html`<option>`, {textContent: o.name, selected: o.selected}))}`;
  form.i.onchange = () => form.dispatchEvent(new CustomEvent("input"));
  form.oninput = () => form.value = options[form.i.selectedIndex].value;
  form.oninput();
  return form;
}


async function* _chart(d3,width,height,randomize,area,z)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  const path = svg.selectAll("path")
    .data(randomize)
    .join("path")
      .attr("d", area)
      .attr("fill", () => z(Math.random()));

  while (true) {
    yield svg.node();

    await path
      .data(randomize)
      .transition()
        .delay(1000)
        .duration(1500)
        .attr("d", area)
      .end();
  }
}


function _x(d3,m,width){return(
d3.scaleLinear([0, m - 1], [0, width])
)}

function _y(d3,height){return(
d3.scaleLinear([0, 1], [height, 0])
)}

function _z(d3){return(
d3.interpolateCool
)}

function _area(d3,x,y){return(
d3.area()
    .x((d, i) => x(i))
    .y0(d => y(d[0]))
    .y1(d => y(d[1]))
)}

function _stack(d3,n,offset){return(
d3.stack()
    .keys(d3.range(n))
    .offset(offset)
    .order(d3.stackOrderNone)
)}

function _height(){return(
500
)}

function _n(){return(
20
)}

function _m(){return(
200
)}

function _k(){return(
10
)}

function _randomize(stack,d3,n,bumps,m,k,y){return(
function randomize() {
  const layers = stack(d3.transpose(Array.from({length: n}, () => bumps(m, k))));
  y.domain([
    d3.min(layers, l => d3.min(l, d => d[0])),
    d3.max(layers, l => d3.max(l, d => d[1]))
  ]);
  return layers;
}
)}

function _bumps()
{
  // Inspired by Lee Byron’s test data generator.
  function bump(a, n) {
    const x = 1 / (0.1 + Math.random());
    const y = 2 * Math.random() - 0.5;
    const z = 10 / (0.1 + Math.random());
    for (let i = 0; i < n; ++i) {
      const w = (i / n - y) * z;
      a[i] += x * Math.exp(-w * w);
    }
  }
  return function bumps(n, m) {
    const a = [];
    for (let i = 0; i < n; ++i) a[i] = 0;
    for (let i = 0; i < m; ++i) bump(a, n);
    return a;
  };
}


function _d3(require){return(
require("d3@6")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof offset")).define("viewof offset", ["d3","html"], _offset);
  main.variable(observer("offset")).define("offset", ["Generators", "viewof offset"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["d3","width","height","randomize","area","z"], _chart);
  main.variable(observer("x")).define("x", ["d3","m","width"], _x);
  main.variable(observer("y")).define("y", ["d3","height"], _y);
  main.variable(observer("z")).define("z", ["d3"], _z);
  main.variable(observer("area")).define("area", ["d3","x","y"], _area);
  main.variable(observer("stack")).define("stack", ["d3","n","offset"], _stack);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("n")).define("n", _n);
  main.variable(observer("m")).define("m", _m);
  main.variable(observer("k")).define("k", _k);
  main.variable(observer("randomize")).define("randomize", ["stack","d3","n","bumps","m","k","y"], _randomize);
  main.variable(observer("bumps")).define("bumps", _bumps);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
