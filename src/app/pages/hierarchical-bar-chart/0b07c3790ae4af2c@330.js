// https://observablehq.com/@d3/hierarchical-bar-chart@330
function _1(md){return(
md
)}

function _chart(d3,width,height,x,root,up,xAxis,yAxis,down)
{
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height);

  x.domain([0, root.value]);

  svg.append("rect")
      .attr("class", "background")
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .attr("width", width)
      .attr("height", height)
      .attr("cursor", "pointer")
      .on("click", (event, d) => up(svg, d));

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  down(svg, root);

  return svg.node();
}


function _bar(margin,barStep,barPadding,x){return(
function bar(svg, down, d, selector) {
  const g = svg.insert("g", selector)
      .attr("class", "enter")
      .attr("transform", `translate(0,${margin.top + barStep * barPadding})`)
      .attr("text-anchor", "end")
      .style("font", "10px sans-serif");

  const bar = g.selectAll("g")
    .data(d.children)
    .join("g")
      .attr("cursor", d => !d.children ? null : "pointer")
      .on("click", (event, d) => down(svg, d));

  bar.append("text")
      .attr("x", margin.left - 6)
      .attr("y", barStep * (1 - barPadding) / 2)
      .attr("dy", ".35em")
      .text(d => d.data.name);

  bar.append("rect")
      .attr("x", x(0))
      .attr("width", d => x(d.value) - x(0))
      .attr("height", barStep * (1 - barPadding));

  return g;
}
)}

function _down(d3,duration,bar,stack,stagger,x,xAxis,barStep,color){return(
function down(svg, d) {
  if (!d.children || d3.active(svg.node())) return;

  // Rebind the current node to the background.
  svg.select(".background").datum(d);

  // Define two sequenced transitions.
  const transition1 = svg.transition().duration(duration);
  const transition2 = transition1.transition();

  // Mark any currently-displayed bars as exiting.
  const exit = svg.selectAll(".enter")
      .attr("class", "exit");

  // Entering nodes immediately obscure the clicked-on bar, so hide it.
  exit.selectAll("rect")
      .attr("fill-opacity", p => p === d ? 0 : null);

  // Transition exiting bars to fade out.
  exit.transition(transition1)
      .attr("fill-opacity", 0)
      .remove();

  // Enter the new bars for the clicked-on data.
  // Per above, entering bars are immediately visible.
  const enter = bar(svg, down, d, ".y-axis")
      .attr("fill-opacity", 0);

  // Have the text fade-in, even though the bars are visible.
  enter.transition(transition1)
      .attr("fill-opacity", 1);

  // Transition entering bars to their new y-position.
  enter.selectAll("g")
      .attr("transform", stack(d.index))
    .transition(transition1)
      .attr("transform", stagger());

  // Update the x-scale domain.
  x.domain([0, d3.max(d.children, d => d.value)]);

  // Update the x-axis.
  svg.selectAll(".x-axis").transition(transition2)
      .call(xAxis);

  // Transition entering bars to the new x-scale.
  enter.selectAll("g").transition(transition2)
      .attr("transform", (d, i) => `translate(0,${barStep * i})`);

  // Color the bars as parents; they will fade to children if appropriate.
  enter.selectAll("rect")
      .attr("fill", color(true))
      .attr("fill-opacity", 1)
    .transition(transition2)
      .attr("fill", d => color(!!d.children))
      .attr("width", d => x(d.value) - x(0));
}
)}

function _up(duration,x,d3,xAxis,stagger,stack,color,bar,down,barStep){return(
function up(svg, d) {
  if (!d.parent || !svg.selectAll(".exit").empty()) return;

  // Rebind the current node to the background.
  svg.select(".background").datum(d.parent);

  // Define two sequenced transitions.
  const transition1 = svg.transition().duration(duration);
  const transition2 = transition1.transition();

  // Mark any currently-displayed bars as exiting.
  const exit = svg.selectAll(".enter")
      .attr("class", "exit");

  // Update the x-scale domain.
  x.domain([0, d3.max(d.parent.children, d => d.value)]);

  // Update the x-axis.
  svg.selectAll(".x-axis").transition(transition1)
      .call(xAxis);

  // Transition exiting bars to the new x-scale.
  exit.selectAll("g").transition(transition1)
      .attr("transform", stagger());

  // Transition exiting bars to the parent’s position.
  exit.selectAll("g").transition(transition2)
      .attr("transform", stack(d.index));

  // Transition exiting rects to the new scale and fade to parent color.
  exit.selectAll("rect").transition(transition1)
      .attr("width", d => x(d.value) - x(0))
      .attr("fill", color(true));

  // Transition exiting text to fade out.
  // Remove exiting nodes.
  exit.transition(transition2)
      .attr("fill-opacity", 0)
      .remove();

  // Enter the new bars for the clicked-on data's parent.
  const enter = bar(svg, down, d.parent, ".exit")
      .attr("fill-opacity", 0);

  enter.selectAll("g")
      .attr("transform", (d, i) => `translate(0,${barStep * i})`);

  // Transition entering bars to fade in over the full duration.
  enter.transition(transition2)
      .attr("fill-opacity", 1);

  // Color the bars as appropriate.
  // Exiting nodes will obscure the parent bar, so hide it.
  // Transition entering rects to the new x-scale.
  // When the entering parent rect is done, make it visible!
  enter.selectAll("rect")
      .attr("fill", d => color(!!d.children))
      .attr("fill-opacity", p => p === d ? 0 : null)
    .transition(transition2)
      .attr("width", d => x(d.value) - x(0))
      .on("end", function(p) { d3.select(this).attr("fill-opacity", 1); });
}
)}

function _stack(x,barStep){return(
function stack(i) {
  let value = 0;
  return d => {
    const t = `translate(${x(value) - x(0)},${barStep * i})`;
    value += d.value;
    return t;
  };
}
)}

function _stagger(x,barStep){return(
function stagger() {
  let value = 0;
  return (d, i) => {
    const t = `translate(${x(value) - x(0)},${barStep * i})`;
    value += d.value;
    return t;
  };
}
)}

function _root(d3,data){return(
d3.hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value)
    .eachAfter(d => d.index = d.parent ? d.parent.index = d.parent.index + 1 || 0 : 0)
)}

function _data(FileAttachment){return(
    {
        "name": "flare",
        "children": [
         {
          "name": "analytics",
          "children": [
           {
            "name": "cluster",
            "children": [
             {"name": "AgglomerativeCluster", "value": 3938},
             {"name": "CommunityStructure", "value": 3812},
             {"name": "HierarchicalCluster", "value": 6714},
             {"name": "MergeEdge", "value": 743}
            ]
           },
           {
            "name": "graph",
            "children": [
             {"name": "BetweennessCentrality", "value": 3534},
             {"name": "LinkDistance", "value": 5731},
             {"name": "MaxFlowMinCut", "value": 7840},
             {"name": "ShortestPaths", "value": 5914},
             {"name": "SpanningTree", "value": 3416}
            ]
           },
           {
            "name": "optimization",
            "children": [
             {"name": "AspectRatioBanker", "value": 7074}
            ]
           }
          ]
         },
         {
          "name": "animate",
          "children": [
           {"name": "Easing", "value": 17010},
           {"name": "FunctionSequence", "value": 5842},
           {
            "name": "interpolate",
            "children": [
             {"name": "ArrayInterpolator", "value": 1983},
             {"name": "ColorInterpolator", "value": 2047},
             {"name": "DateInterpolator", "value": 1375},
             {"name": "Interpolator", "value": 8746},
             {"name": "MatrixInterpolator", "value": 2202},
             {"name": "NumberInterpolator", "value": 1382},
             {"name": "ObjectInterpolator", "value": 1629},
             {"name": "PointInterpolator", "value": 1675},
             {"name": "RectangleInterpolator", "value": 2042}
            ]
           },
           {"name": "ISchedulable", "value": 1041},
           {"name": "Parallel", "value": 5176},
           {"name": "Pause", "value": 449},
           {"name": "Scheduler", "value": 5593},
           {"name": "Sequence", "value": 5534},
           {"name": "Transition", "value": 9201},
           {"name": "Transitioner", "value": 19975},
           {"name": "TransitionEvent", "value": 1116},
           {"name": "Tween", "value": 6006}
          ]
         },
         {
          "name": "data",
          "children": [
           {
            "name": "converters",
            "children": [
             {"name": "Converters", "value": 721},
             {"name": "DelimitedTextConverter", "value": 4294},
             {"name": "GraphMLConverter", "value": 9800},
             {"name": "IDataConverter", "value": 1314},
             {"name": "JSONConverter", "value": 2220}
            ]
           },
           {"name": "DataField", "value": 1759},
           {"name": "DataSchema", "value": 2165},
           {"name": "DataSet", "value": 586},
           {"name": "DataSource", "value": 3331},
           {"name": "DataTable", "value": 772},
           {"name": "DataUtil", "value": 3322}
          ]
         },
         {
          "name": "display",
          "children": [
           {"name": "DirtySprite", "value": 8833},
           {"name": "LineSprite", "value": 1732},
           {"name": "RectSprite", "value": 3623},
           {"name": "TextSprite", "value": 10066}
          ]
         },
         {
          "name": "flex",
          "children": [
           {"name": "FlareVis", "value": 4116}
          ]
         },
         {
          "name": "physics",
          "children": [
           {"name": "DragForce", "value": 1082},
           {"name": "GravityForce", "value": 1336},
           {"name": "IForce", "value": 319},
           {"name": "NBodyForce", "value": 10498},
           {"name": "Particle", "value": 2822},
           {"name": "Simulation", "value": 9983},
           {"name": "Spring", "value": 2213},
           {"name": "SpringForce", "value": 1681}
          ]
         },
         {
          "name": "query",
          "children": [
           {"name": "AggregateExpression", "value": 1616},
           {"name": "And", "value": 1027},
           {"name": "Arithmetic", "value": 3891},
           {"name": "Average", "value": 891},
           {"name": "BinaryExpression", "value": 2893},
           {"name": "Comparison", "value": 5103},
           {"name": "CompositeExpression", "value": 3677},
           {"name": "Count", "value": 781},
           {"name": "DateUtil", "value": 4141},
           {"name": "Distinct", "value": 933},
           {"name": "Expression", "value": 5130},
           {"name": "ExpressionIterator", "value": 3617},
           {"name": "Fn", "value": 3240},
           {"name": "If", "value": 2732},
           {"name": "IsA", "value": 2039},
           {"name": "Literal", "value": 1214},
           {"name": "Match", "value": 3748},
           {"name": "Maximum", "value": 843},
           {
            "name": "methods",
            "children": [
             {"name": "add", "value": 593},
             {"name": "and", "value": 330},
             {"name": "average", "value": 287},
             {"name": "count", "value": 277},
             {"name": "distinct", "value": 292},
             {"name": "div", "value": 595},
             {"name": "eq", "value": 594},
             {"name": "fn", "value": 460},
             {"name": "gt", "value": 603},
             {"name": "gte", "value": 625},
             {"name": "iff", "value": 748},
             {"name": "isa", "value": 461},
             {"name": "lt", "value": 597},
             {"name": "lte", "value": 619},
             {"name": "max", "value": 283},
             {"name": "min", "value": 283},
             {"name": "mod", "value": 591},
             {"name": "mul", "value": 603},
             {"name": "neq", "value": 599},
             {"name": "not", "value": 386},
             {"name": "or", "value": 323},
             {"name": "orderby", "value": 307},
             {"name": "range", "value": 772},
             {"name": "select", "value": 296},
             {"name": "stddev", "value": 363},
             {"name": "sub", "value": 600},
             {"name": "sum", "value": 280},
             {"name": "update", "value": 307},
             {"name": "variance", "value": 335},
             {"name": "where", "value": 299},
             {"name": "xor", "value": 354},
             {"name": "_", "value": 264}
            ]
           },
           {"name": "Minimum", "value": 843},
           {"name": "Not", "value": 1554},
           {"name": "Or", "value": 970},
           {"name": "Query", "value": 13896},
           {"name": "Range", "value": 1594},
           {"name": "StringUtil", "value": 4130},
           {"name": "Sum", "value": 791},
           {"name": "Variable", "value": 1124},
           {"name": "Variance", "value": 1876},
           {"name": "Xor", "value": 1101}
          ]
         },
         {
          "name": "scale",
          "children": [
           {"name": "IScaleMap", "value": 2105},
           {"name": "LinearScale", "value": 1316},
           {"name": "LogScale", "value": 3151},
           {"name": "OrdinalScale", "value": 3770},
           {"name": "QuantileScale", "value": 2435},
           {"name": "QuantitativeScale", "value": 4839},
           {"name": "RootScale", "value": 1756},
           {"name": "Scale", "value": 4268},
           {"name": "ScaleType", "value": 1821},
           {"name": "TimeScale", "value": 5833}
          ]
         },
         {
          "name": "util",
          "children": [
           {"name": "Arrays", "value": 8258},
           {"name": "Colors", "value": 10001},
           {"name": "Dates", "value": 8217},
           {"name": "Displays", "value": 12555},
           {"name": "Filter", "value": 2324},
           {"name": "Geometry", "value": 10993},
           {
            "name": "heap",
            "children": [
             {"name": "FibonacciHeap", "value": 9354},
             {"name": "HeapNode", "value": 1233}
            ]
           },
           {"name": "IEvaluable", "value": 335},
           {"name": "IPredicate", "value": 383},
           {"name": "IValueProxy", "value": 874},
           {
            "name": "math",
            "children": [
             {"name": "DenseMatrix", "value": 3165},
             {"name": "IMatrix", "value": 2815},
             {"name": "SparseMatrix", "value": 3366}
            ]
           },
           {"name": "Maths", "value": 17705},
           {"name": "Orientation", "value": 1486},
           {
            "name": "palette",
            "children": [
             {"name": "ColorPalette", "value": 6367},
             {"name": "Palette", "value": 1229},
             {"name": "ShapePalette", "value": 2059},
             {"name": "SizePalette", "value": 2291}
            ]
           },
           {"name": "Property", "value": 5559},
           {"name": "Shapes", "value": 19118},
           {"name": "Sort", "value": 6887},
           {"name": "Stats", "value": 6557},
           {"name": "Strings", "value": 22026}
          ]
         },
         {
          "name": "vis",
          "children": [
           {
            "name": "axis",
            "children": [
             {"name": "Axes", "value": 1302},
             {"name": "Axis", "value": 24593},
             {"name": "AxisGridLine", "value": 652},
             {"name": "AxisLabel", "value": 636},
             {"name": "CartesianAxes", "value": 6703}
            ]
           },
           {
            "name": "controls",
            "children": [
             {"name": "AnchorControl", "value": 2138},
             {"name": "ClickControl", "value": 3824},
             {"name": "Control", "value": 1353},
             {"name": "ControlList", "value": 4665},
             {"name": "DragControl", "value": 2649},
             {"name": "ExpandControl", "value": 2832},
             {"name": "HoverControl", "value": 4896},
             {"name": "IControl", "value": 763},
             {"name": "PanZoomControl", "value": 5222},
             {"name": "SelectionControl", "value": 7862},
             {"name": "TooltipControl", "value": 8435}
            ]
           },
           {
            "name": "data",
            "children": [
             {"name": "Data", "value": 20544},
             {"name": "DataList", "value": 19788},
             {"name": "DataSprite", "value": 10349},
             {"name": "EdgeSprite", "value": 3301},
             {"name": "NodeSprite", "value": 19382},
             {
              "name": "render",
              "children": [
               {"name": "ArrowType", "value": 698},
               {"name": "EdgeRenderer", "value": 5569},
               {"name": "IRenderer", "value": 353},
               {"name": "ShapeRenderer", "value": 2247}
              ]
             },
             {"name": "ScaleBinding", "value": 11275},
             {"name": "Tree", "value": 7147},
             {"name": "TreeBuilder", "value": 9930}
            ]
           },
           {
            "name": "events",
            "children": [
             {"name": "DataEvent", "value": 2313},
             {"name": "SelectionEvent", "value": 1880},
             {"name": "TooltipEvent", "value": 1701},
             {"name": "VisualizationEvent", "value": 1117}
            ]
           },
           {
            "name": "legend",
            "children": [
             {"name": "Legend", "value": 20859},
             {"name": "LegendItem", "value": 4614},
             {"name": "LegendRange", "value": 10530}
            ]
           },
           {
            "name": "operator",
            "children": [
             {
              "name": "distortion",
              "children": [
               {"name": "BifocalDistortion", "value": 4461},
               {"name": "Distortion", "value": 6314},
               {"name": "FisheyeDistortion", "value": 3444}
              ]
             },
             {
              "name": "encoder",
              "children": [
               {"name": "ColorEncoder", "value": 3179},
               {"name": "Encoder", "value": 4060},
               {"name": "PropertyEncoder", "value": 4138},
               {"name": "ShapeEncoder", "value": 1690},
               {"name": "SizeEncoder", "value": 1830}
              ]
             },
             {
              "name": "filter",
              "children": [
               {"name": "FisheyeTreeFilter", "value": 5219},
               {"name": "GraphDistanceFilter", "value": 3165},
               {"name": "VisibilityFilter", "value": 3509}
              ]
             },
             {"name": "IOperator", "value": 1286},
             {
              "name": "label",
              "children": [
               {"name": "Labeler", "value": 9956},
               {"name": "RadialLabeler", "value": 3899},
               {"name": "StackedAreaLabeler", "value": 3202}
              ]
             },
             {
              "name": "layout",
              "children": [
               {"name": "AxisLayout", "value": 6725},
               {"name": "BundledEdgeRouter", "value": 3727},
               {"name": "CircleLayout", "value": 9317},
               {"name": "CirclePackingLayout", "value": 12003},
               {"name": "DendrogramLayout", "value": 4853},
               {"name": "ForceDirectedLayout", "value": 8411},
               {"name": "IcicleTreeLayout", "value": 4864},
               {"name": "IndentedTreeLayout", "value": 3174},
               {"name": "Layout", "value": 7881},
               {"name": "NodeLinkTreeLayout", "value": 12870},
               {"name": "PieLayout", "value": 2728},
               {"name": "RadialTreeLayout", "value": 12348},
               {"name": "RandomLayout", "value": 870},
               {"name": "StackedAreaLayout", "value": 9121},
               {"name": "TreeMapLayout", "value": 9191}
              ]
             },
             {"name": "Operator", "value": 2490},
             {"name": "OperatorList", "value": 5248},
             {"name": "OperatorSequence", "value": 4190},
             {"name": "OperatorSwitch", "value": 2581},
             {"name": "SortOperator", "value": 2023}
            ]
           },
           {"name": "Visualization", "value": 16540}
          ]
         }
        ]
       }
       
)}

function _x(d3,margin,width){return(
d3.scaleLinear().range([margin.left, width - margin.right])
)}

function _xAxis(margin,d3,x,width){return(
g => g
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${margin.top})`)
    .call(d3.axisTop(x).ticks(width / 80, "s"))
    .call(g => (g.selection ? g.selection() : g).select(".domain").remove())
)}

function _yAxis(margin,height){return(
g => g
    .attr("class", "y-axis")
    .attr("transform", `translate(${margin.left + 0.5},0)`)
    .call(g => g.append("line")
        .attr("stroke", "currentColor")
        .attr("y1", margin.top)
        .attr("y2", height - margin.bottom))
)}

function _color(d3){return(
d3.scaleOrdinal([true, false], ["steelblue", "#aaa"])
)}

function _barStep(){return(
27
)}

function _barPadding(barStep){return(
3 / barStep
)}

function _duration(){return(
750
)}

function _height(root,barStep,margin)
{
  let max = 1;
  root.each(d => d.children && (max = Math.max(max, d.children.length)));
  return max * barStep + margin.top + margin.bottom;
}


function _margin(){return(
{top: 30, right: 30, bottom: 0, left: 100}
)}

function _d3(require){return(
require("d3@6")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
//   const fileAttachments = new Map([
//     ["flare-2.json", {url: new URL("./files/e65374209781891f37dea1e7a6e1c5e020a3009b8aedf113b4c80942018887a1176ad4945cf14444603ff91d3da371b3b0d72419fa8d2ee0f6e815732475d5de", import.meta.url), mimeType: null, toString}]
//   ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("chart")).define("chart", ["d3","width","height","x","root","up","xAxis","yAxis","down"], _chart);
  main.variable(observer("bar")).define("bar", ["margin","barStep","barPadding","x"], _bar);
  main.variable(observer("down")).define("down", ["d3","duration","bar","stack","stagger","x","xAxis","barStep","color"], _down);
  main.variable(observer("up")).define("up", ["duration","x","d3","xAxis","stagger","stack","color","bar","down","barStep"], _up);
  main.variable(observer("stack")).define("stack", ["x","barStep"], _stack);
  main.variable(observer("stagger")).define("stagger", ["x","barStep"], _stagger);
  main.variable(observer("root")).define("root", ["d3","data"], _root);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("x")).define("x", ["d3","margin","width"], _x);
  main.variable(observer("xAxis")).define("xAxis", ["margin","d3","x","width"], _xAxis);
  main.variable(observer("yAxis")).define("yAxis", ["margin","height"], _yAxis);
  main.variable(observer("color")).define("color", ["d3"], _color);
  main.variable(observer("barStep")).define("barStep", _barStep);
  main.variable(observer("barPadding")).define("barPadding", ["barStep"], _barPadding);
  main.variable(observer("duration")).define("duration", _duration);
  main.variable(observer("height")).define("height", ["root","barStep","margin"], _height);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
