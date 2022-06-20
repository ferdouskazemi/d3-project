// https://observablehq.com/@d3/arc-diagram@277
function _1(md){return(
md
)}

function _order(d3,html)
{
  const options = [
    {name: "Order by name", value: (a, b) => d3.ascending(a.id, b.id)},
    {name: "Order by group", value: (a, b) => a.group - b.group || d3.ascending(a.id, b.id)},
    {name: "Order by degree", value: (a, b) => d3.sum(b.sourceLinks, l => l.value) + d3.sum(b.targetLinks, l => l.value) - d3.sum(a.sourceLinks, l => l.value) - d3.sum(a.targetLinks, l => l.value) || d3.ascending(a.id, b.id)}
  ];
  const form = html`<form style="display: flex; align-items: center; min-height: 33px;"><select name=i>${options.map(o => Object.assign(html`<option>`, {textContent: o.name}))}`;
  const timeout = setTimeout(() => {
    form.i.selectedIndex = 1;
    form.dispatchEvent(new CustomEvent("input"));
  }, 2000);
  form.onchange = () => {
    form.dispatchEvent(new CustomEvent("input")); // Safari
  };
  form.oninput = (event) => {
    if (event.isTrusted) form.onchange = null, clearTimeout(timeout);
    form.value = options[form.i.selectedIndex].value;
  };
  form.value = options[form.i.selectedIndex].value;
  return form;
}


function _chart(d3,DOM,width,height,graph,margin,y,color,arc,step,$0,invalidation)
{
  const svg = d3.select(DOM.svg(width, height));

  svg.append("style").text(`

.hover path {
  stroke: #ccc;
}

.hover text {
  fill: #ccc;
}

.hover g.primary text {
  fill: black;
  font-weight: bold;
}

.hover g.secondary text {
  fill: #333;
}

.hover path.primary {
  stroke: #333;
  stroke-opacity: 1;
}

`);

  const label = svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(graph.nodes)
    .join("g")
      .attr("transform", d => `translate(${margin.left},${d.y = y(d.id)})`)
      .call(g => g.append("text")
          .attr("x", -6)
          .attr("dy", "0.35em")
          .attr("fill", d => d3.lab(color(d.group)).darker(2))
          .text(d => d.id))
      .call(g => g.append("circle")
          .attr("r", 3)
          .attr("fill", d => color(d.group)));

  const path = svg.insert("g", "*")
      .attr("fill", "none")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 1.5)
    .selectAll("path")
    .data(graph.links)
    .join("path")
      .attr("stroke", d => d.source.group === d.target.group ? color(d.source.group) : "#aaa")
      .attr("d", arc);

  const overlay = svg.append("g")
      .attr("fill", "none")
      .attr("pointer-events", "all")
    .selectAll("rect")
    .data(graph.nodes)
    .join("rect")
      .attr("width", margin.left + 40)
      .attr("height", step)
      .attr("y", d => y(d.id) - step / 2)
      .on("mouseover", d => {
        svg.classed("hover", true);
        label.classed("primary", n => n === d);
        label.classed("secondary", n => n.sourceLinks.some(l => l.target === d) || n.targetLinks.some(l => l.source === d));
        path.classed("primary", l => l.source === d || l.target === d).filter(".primary").raise();
      })
      .on("mouseout", d => {
        svg.classed("hover", false);
        label.classed("primary", false);
        label.classed("secondary", false);
        path.classed("primary", false).order();
      });

  function update() {
    y.domain(graph.nodes.sort($0.value).map(d => d.id));

    const t = svg.transition()
        .duration(750);

    label.transition(t)
        .delay((d, i) => i * 20)
        .attrTween("transform", d => {
          const i = d3.interpolateNumber(d.y, y(d.id));
          return t => `translate(${margin.left},${d.y = i(t)})`;
        });

    path.transition(t)
        .duration(750 + graph.nodes.length * 20)
        .attrTween("d", d => () => arc(d));

    overlay.transition(t)
        .delay((d, i) => i * 20)
        .attr("y", d => y(d.id) - step / 2);
  }

  $0.addEventListener("input", update);
  invalidation.then(() => $0.removeEventListener("input", update));

  return svg.node();
}


function _arc(margin){return(
function arc(d) {
  const y1 = d.source.y;
  const y2 = d.target.y;
  const r = Math.abs(y2 - y1) / 2;
  return `M${margin.left},${y1}A${r},${r} 0,0,${y1 < y2 ? 1 : 0} ${margin.left},${y2}`;
}
)}

function _y(d3,graph,margin,height){return(
d3.scalePoint(graph.nodes.map(d => d.id).sort(d3.ascending), [margin.top, height - margin.bottom])
)}

function _margin(){return(
{top: 20, right: 20, bottom: 20, left: 100}
)}

function _height(data,step,margin){return(
(data.nodes.length - 1) * step + margin.top + margin.bottom
)}

function _step(){return(
14
)}

function _color(d3,graph){return(
d3.scaleOrdinal(graph.nodes.map(d => d.group).sort(d3.ascending), d3.schemeCategory10)
)}

function _graph(data)
{
  const nodes = data.nodes.map(({id, group}) => ({
    id,
    sourceLinks: [],
    targetLinks: [],
    group
  }));

  const nodeById = new Map(nodes.map(d => [d.id, d]));

  const links = data.links.map(({source, target, value}) => ({
    source: nodeById.get(source),
    target: nodeById.get(target),
    value
  }));

  for (const link of links) {
    const {source, target, value} = link;
    source.sourceLinks.push(link);
    target.targetLinks.push(link);
  }

  return {nodes, links};
}


function _data(FileAttachment){return(
  {
    "nodes": [
      {"id": "Myriel", "group": 1},
      {"id": "Napoleon", "group": 1},
      {"id": "Mlle.Baptistine", "group": 1},
      {"id": "Mme.Magloire", "group": 1},
      {"id": "CountessdeLo", "group": 1},
      {"id": "Geborand", "group": 1},
      {"id": "Champtercier", "group": 1},
      {"id": "Cravatte", "group": 1},
      {"id": "Count", "group": 1},
      {"id": "OldMan", "group": 1},
      {"id": "Labarre", "group": 2},
      {"id": "Valjean", "group": 2},
      {"id": "Marguerite", "group": 3},
      {"id": "Mme.deR", "group": 2},
      {"id": "Isabeau", "group": 2},
      {"id": "Gervais", "group": 2},
      {"id": "Tholomyes", "group": 3},
      {"id": "Listolier", "group": 3},
      {"id": "Fameuil", "group": 3},
      {"id": "Blacheville", "group": 3},
      {"id": "Favourite", "group": 3},
      {"id": "Dahlia", "group": 3},
      {"id": "Zephine", "group": 3},
      {"id": "Fantine", "group": 3},
      {"id": "Mme.Thenardier", "group": 4},
      {"id": "Thenardier", "group": 4},
      {"id": "Cosette", "group": 5},
      {"id": "Javert", "group": 4},
      {"id": "Fauchelevent", "group": 0},
      {"id": "Bamatabois", "group": 2},
      {"id": "Perpetue", "group": 3},
      {"id": "Simplice", "group": 2},
      {"id": "Scaufflaire", "group": 2},
      {"id": "Woman1", "group": 2},
      {"id": "Judge", "group": 2},
      {"id": "Champmathieu", "group": 2},
      {"id": "Brevet", "group": 2},
      {"id": "Chenildieu", "group": 2},
      {"id": "Cochepaille", "group": 2},
      {"id": "Pontmercy", "group": 4},
      {"id": "Boulatruelle", "group": 6},
      {"id": "Eponine", "group": 4},
      {"id": "Anzelma", "group": 4},
      {"id": "Woman2", "group": 5},
      {"id": "MotherInnocent", "group": 0},
      {"id": "Gribier", "group": 0},
      {"id": "Jondrette", "group": 7},
      {"id": "Mme.Burgon", "group": 7},
      {"id": "Gavroche", "group": 8},
      {"id": "Gillenormand", "group": 5},
      {"id": "Magnon", "group": 5},
      {"id": "Mlle.Gillenormand", "group": 5},
      {"id": "Mme.Pontmercy", "group": 5},
      {"id": "Mlle.Vaubois", "group": 5},
      {"id": "Lt.Gillenormand", "group": 5},
      {"id": "Marius", "group": 8},
      {"id": "BaronessT", "group": 5},
      {"id": "Mabeuf", "group": 8},
      {"id": "Enjolras", "group": 8},
      {"id": "Combeferre", "group": 8},
      {"id": "Prouvaire", "group": 8},
      {"id": "Feuilly", "group": 8},
      {"id": "Courfeyrac", "group": 8},
      {"id": "Bahorel", "group": 8},
      {"id": "Bossuet", "group": 8},
      {"id": "Joly", "group": 8},
      {"id": "Grantaire", "group": 8},
      {"id": "MotherPlutarch", "group": 9},
      {"id": "Gueulemer", "group": 4},
      {"id": "Babet", "group": 4},
      {"id": "Claquesous", "group": 4},
      {"id": "Montparnasse", "group": 4},
      {"id": "Toussaint", "group": 5},
      {"id": "Child1", "group": 10},
      {"id": "Child2", "group": 10},
      {"id": "Brujon", "group": 4},
      {"id": "Mme.Hucheloup", "group": 8}
    ],
    "links": [
      {"source": "Napoleon", "target": "Myriel", "value": 1},
      {"source": "Mlle.Baptistine", "target": "Myriel", "value": 8},
      {"source": "Mme.Magloire", "target": "Myriel", "value": 10},
      {"source": "Mme.Magloire", "target": "Mlle.Baptistine", "value": 6},
      {"source": "CountessdeLo", "target": "Myriel", "value": 1},
      {"source": "Geborand", "target": "Myriel", "value": 1},
      {"source": "Champtercier", "target": "Myriel", "value": 1},
      {"source": "Cravatte", "target": "Myriel", "value": 1},
      {"source": "Count", "target": "Myriel", "value": 2},
      {"source": "OldMan", "target": "Myriel", "value": 1},
      {"source": "Valjean", "target": "Labarre", "value": 1},
      {"source": "Valjean", "target": "Mme.Magloire", "value": 3},
      {"source": "Valjean", "target": "Mlle.Baptistine", "value": 3},
      {"source": "Valjean", "target": "Myriel", "value": 5},
      {"source": "Marguerite", "target": "Valjean", "value": 1},
      {"source": "Mme.deR", "target": "Valjean", "value": 1},
      {"source": "Isabeau", "target": "Valjean", "value": 1},
      {"source": "Gervais", "target": "Valjean", "value": 1},
      {"source": "Listolier", "target": "Tholomyes", "value": 4},
      {"source": "Fameuil", "target": "Tholomyes", "value": 4},
      {"source": "Fameuil", "target": "Listolier", "value": 4},
      {"source": "Blacheville", "target": "Tholomyes", "value": 4},
      {"source": "Blacheville", "target": "Listolier", "value": 4},
      {"source": "Blacheville", "target": "Fameuil", "value": 4},
      {"source": "Favourite", "target": "Tholomyes", "value": 3},
      {"source": "Favourite", "target": "Listolier", "value": 3},
      {"source": "Favourite", "target": "Fameuil", "value": 3},
      {"source": "Favourite", "target": "Blacheville", "value": 4},
      {"source": "Dahlia", "target": "Tholomyes", "value": 3},
      {"source": "Dahlia", "target": "Listolier", "value": 3},
      {"source": "Dahlia", "target": "Fameuil", "value": 3},
      {"source": "Dahlia", "target": "Blacheville", "value": 3},
      {"source": "Dahlia", "target": "Favourite", "value": 5},
      {"source": "Zephine", "target": "Tholomyes", "value": 3},
      {"source": "Zephine", "target": "Listolier", "value": 3},
      {"source": "Zephine", "target": "Fameuil", "value": 3},
      {"source": "Zephine", "target": "Blacheville", "value": 3},
      {"source": "Zephine", "target": "Favourite", "value": 4},
      {"source": "Zephine", "target": "Dahlia", "value": 4},
      {"source": "Fantine", "target": "Tholomyes", "value": 3},
      {"source": "Fantine", "target": "Listolier", "value": 3},
      {"source": "Fantine", "target": "Fameuil", "value": 3},
      {"source": "Fantine", "target": "Blacheville", "value": 3},
      {"source": "Fantine", "target": "Favourite", "value": 4},
      {"source": "Fantine", "target": "Dahlia", "value": 4},
      {"source": "Fantine", "target": "Zephine", "value": 4},
      {"source": "Fantine", "target": "Marguerite", "value": 2},
      {"source": "Fantine", "target": "Valjean", "value": 9},
      {"source": "Mme.Thenardier", "target": "Fantine", "value": 2},
      {"source": "Mme.Thenardier", "target": "Valjean", "value": 7},
      {"source": "Thenardier", "target": "Mme.Thenardier", "value": 13},
      {"source": "Thenardier", "target": "Fantine", "value": 1},
      {"source": "Thenardier", "target": "Valjean", "value": 12},
      {"source": "Cosette", "target": "Mme.Thenardier", "value": 4},
      {"source": "Cosette", "target": "Valjean", "value": 31},
      {"source": "Cosette", "target": "Tholomyes", "value": 1},
      {"source": "Cosette", "target": "Thenardier", "value": 1},
      {"source": "Javert", "target": "Valjean", "value": 17},
      {"source": "Javert", "target": "Fantine", "value": 5},
      {"source": "Javert", "target": "Thenardier", "value": 5},
      {"source": "Javert", "target": "Mme.Thenardier", "value": 1},
      {"source": "Javert", "target": "Cosette", "value": 1},
      {"source": "Fauchelevent", "target": "Valjean", "value": 8},
      {"source": "Fauchelevent", "target": "Javert", "value": 1},
      {"source": "Bamatabois", "target": "Fantine", "value": 1},
      {"source": "Bamatabois", "target": "Javert", "value": 1},
      {"source": "Bamatabois", "target": "Valjean", "value": 2},
      {"source": "Perpetue", "target": "Fantine", "value": 1},
      {"source": "Simplice", "target": "Perpetue", "value": 2},
      {"source": "Simplice", "target": "Valjean", "value": 3},
      {"source": "Simplice", "target": "Fantine", "value": 2},
      {"source": "Simplice", "target": "Javert", "value": 1},
      {"source": "Scaufflaire", "target": "Valjean", "value": 1},
      {"source": "Woman1", "target": "Valjean", "value": 2},
      {"source": "Woman1", "target": "Javert", "value": 1},
      {"source": "Judge", "target": "Valjean", "value": 3},
      {"source": "Judge", "target": "Bamatabois", "value": 2},
      {"source": "Champmathieu", "target": "Valjean", "value": 3},
      {"source": "Champmathieu", "target": "Judge", "value": 3},
      {"source": "Champmathieu", "target": "Bamatabois", "value": 2},
      {"source": "Brevet", "target": "Judge", "value": 2},
      {"source": "Brevet", "target": "Champmathieu", "value": 2},
      {"source": "Brevet", "target": "Valjean", "value": 2},
      {"source": "Brevet", "target": "Bamatabois", "value": 1},
      {"source": "Chenildieu", "target": "Judge", "value": 2},
      {"source": "Chenildieu", "target": "Champmathieu", "value": 2},
      {"source": "Chenildieu", "target": "Brevet", "value": 2},
      {"source": "Chenildieu", "target": "Valjean", "value": 2},
      {"source": "Chenildieu", "target": "Bamatabois", "value": 1},
      {"source": "Cochepaille", "target": "Judge", "value": 2},
      {"source": "Cochepaille", "target": "Champmathieu", "value": 2},
      {"source": "Cochepaille", "target": "Brevet", "value": 2},
      {"source": "Cochepaille", "target": "Chenildieu", "value": 2},
      {"source": "Cochepaille", "target": "Valjean", "value": 2},
      {"source": "Cochepaille", "target": "Bamatabois", "value": 1},
      {"source": "Pontmercy", "target": "Thenardier", "value": 1},
      {"source": "Boulatruelle", "target": "Thenardier", "value": 1},
      {"source": "Eponine", "target": "Mme.Thenardier", "value": 2},
      {"source": "Eponine", "target": "Thenardier", "value": 3},
      {"source": "Anzelma", "target": "Eponine", "value": 2},
      {"source": "Anzelma", "target": "Thenardier", "value": 2},
      {"source": "Anzelma", "target": "Mme.Thenardier", "value": 1},
      {"source": "Woman2", "target": "Valjean", "value": 3},
      {"source": "Woman2", "target": "Cosette", "value": 1},
      {"source": "Woman2", "target": "Javert", "value": 1},
      {"source": "MotherInnocent", "target": "Fauchelevent", "value": 3},
      {"source": "MotherInnocent", "target": "Valjean", "value": 1},
      {"source": "Gribier", "target": "Fauchelevent", "value": 2},
      {"source": "Mme.Burgon", "target": "Jondrette", "value": 1},
      {"source": "Gavroche", "target": "Mme.Burgon", "value": 2},
      {"source": "Gavroche", "target": "Thenardier", "value": 1},
      {"source": "Gavroche", "target": "Javert", "value": 1},
      {"source": "Gavroche", "target": "Valjean", "value": 1},
      {"source": "Gillenormand", "target": "Cosette", "value": 3},
      {"source": "Gillenormand", "target": "Valjean", "value": 2},
      {"source": "Magnon", "target": "Gillenormand", "value": 1},
      {"source": "Magnon", "target": "Mme.Thenardier", "value": 1},
      {"source": "Mlle.Gillenormand", "target": "Gillenormand", "value": 9},
      {"source": "Mlle.Gillenormand", "target": "Cosette", "value": 2},
      {"source": "Mlle.Gillenormand", "target": "Valjean", "value": 2},
      {"source": "Mme.Pontmercy", "target": "Mlle.Gillenormand", "value": 1},
      {"source": "Mme.Pontmercy", "target": "Pontmercy", "value": 1},
      {"source": "Mlle.Vaubois", "target": "Mlle.Gillenormand", "value": 1},
      {"source": "Lt.Gillenormand", "target": "Mlle.Gillenormand", "value": 2},
      {"source": "Lt.Gillenormand", "target": "Gillenormand", "value": 1},
      {"source": "Lt.Gillenormand", "target": "Cosette", "value": 1},
      {"source": "Marius", "target": "Mlle.Gillenormand", "value": 6},
      {"source": "Marius", "target": "Gillenormand", "value": 12},
      {"source": "Marius", "target": "Pontmercy", "value": 1},
      {"source": "Marius", "target": "Lt.Gillenormand", "value": 1},
      {"source": "Marius", "target": "Cosette", "value": 21},
      {"source": "Marius", "target": "Valjean", "value": 19},
      {"source": "Marius", "target": "Tholomyes", "value": 1},
      {"source": "Marius", "target": "Thenardier", "value": 2},
      {"source": "Marius", "target": "Eponine", "value": 5},
      {"source": "Marius", "target": "Gavroche", "value": 4},
      {"source": "BaronessT", "target": "Gillenormand", "value": 1},
      {"source": "BaronessT", "target": "Marius", "value": 1},
      {"source": "Mabeuf", "target": "Marius", "value": 1},
      {"source": "Mabeuf", "target": "Eponine", "value": 1},
      {"source": "Mabeuf", "target": "Gavroche", "value": 1},
      {"source": "Enjolras", "target": "Marius", "value": 7},
      {"source": "Enjolras", "target": "Gavroche", "value": 7},
      {"source": "Enjolras", "target": "Javert", "value": 6},
      {"source": "Enjolras", "target": "Mabeuf", "value": 1},
      {"source": "Enjolras", "target": "Valjean", "value": 4},
      {"source": "Combeferre", "target": "Enjolras", "value": 15},
      {"source": "Combeferre", "target": "Marius", "value": 5},
      {"source": "Combeferre", "target": "Gavroche", "value": 6},
      {"source": "Combeferre", "target": "Mabeuf", "value": 2},
      {"source": "Prouvaire", "target": "Gavroche", "value": 1},
      {"source": "Prouvaire", "target": "Enjolras", "value": 4},
      {"source": "Prouvaire", "target": "Combeferre", "value": 2},
      {"source": "Feuilly", "target": "Gavroche", "value": 2},
      {"source": "Feuilly", "target": "Enjolras", "value": 6},
      {"source": "Feuilly", "target": "Prouvaire", "value": 2},
      {"source": "Feuilly", "target": "Combeferre", "value": 5},
      {"source": "Feuilly", "target": "Mabeuf", "value": 1},
      {"source": "Feuilly", "target": "Marius", "value": 1},
      {"source": "Courfeyrac", "target": "Marius", "value": 9},
      {"source": "Courfeyrac", "target": "Enjolras", "value": 17},
      {"source": "Courfeyrac", "target": "Combeferre", "value": 13},
      {"source": "Courfeyrac", "target": "Gavroche", "value": 7},
      {"source": "Courfeyrac", "target": "Mabeuf", "value": 2},
      {"source": "Courfeyrac", "target": "Eponine", "value": 1},
      {"source": "Courfeyrac", "target": "Feuilly", "value": 6},
      {"source": "Courfeyrac", "target": "Prouvaire", "value": 3},
      {"source": "Bahorel", "target": "Combeferre", "value": 5},
      {"source": "Bahorel", "target": "Gavroche", "value": 5},
      {"source": "Bahorel", "target": "Courfeyrac", "value": 6},
      {"source": "Bahorel", "target": "Mabeuf", "value": 2},
      {"source": "Bahorel", "target": "Enjolras", "value": 4},
      {"source": "Bahorel", "target": "Feuilly", "value": 3},
      {"source": "Bahorel", "target": "Prouvaire", "value": 2},
      {"source": "Bahorel", "target": "Marius", "value": 1},
      {"source": "Bossuet", "target": "Marius", "value": 5},
      {"source": "Bossuet", "target": "Courfeyrac", "value": 12},
      {"source": "Bossuet", "target": "Gavroche", "value": 5},
      {"source": "Bossuet", "target": "Bahorel", "value": 4},
      {"source": "Bossuet", "target": "Enjolras", "value": 10},
      {"source": "Bossuet", "target": "Feuilly", "value": 6},
      {"source": "Bossuet", "target": "Prouvaire", "value": 2},
      {"source": "Bossuet", "target": "Combeferre", "value": 9},
      {"source": "Bossuet", "target": "Mabeuf", "value": 1},
      {"source": "Bossuet", "target": "Valjean", "value": 1},
      {"source": "Joly", "target": "Bahorel", "value": 5},
      {"source": "Joly", "target": "Bossuet", "value": 7},
      {"source": "Joly", "target": "Gavroche", "value": 3},
      {"source": "Joly", "target": "Courfeyrac", "value": 5},
      {"source": "Joly", "target": "Enjolras", "value": 5},
      {"source": "Joly", "target": "Feuilly", "value": 5},
      {"source": "Joly", "target": "Prouvaire", "value": 2},
      {"source": "Joly", "target": "Combeferre", "value": 5},
      {"source": "Joly", "target": "Mabeuf", "value": 1},
      {"source": "Joly", "target": "Marius", "value": 2},
      {"source": "Grantaire", "target": "Bossuet", "value": 3},
      {"source": "Grantaire", "target": "Enjolras", "value": 3},
      {"source": "Grantaire", "target": "Combeferre", "value": 1},
      {"source": "Grantaire", "target": "Courfeyrac", "value": 2},
      {"source": "Grantaire", "target": "Joly", "value": 2},
      {"source": "Grantaire", "target": "Gavroche", "value": 1},
      {"source": "Grantaire", "target": "Bahorel", "value": 1},
      {"source": "Grantaire", "target": "Feuilly", "value": 1},
      {"source": "Grantaire", "target": "Prouvaire", "value": 1},
      {"source": "MotherPlutarch", "target": "Mabeuf", "value": 3},
      {"source": "Gueulemer", "target": "Thenardier", "value": 5},
      {"source": "Gueulemer", "target": "Valjean", "value": 1},
      {"source": "Gueulemer", "target": "Mme.Thenardier", "value": 1},
      {"source": "Gueulemer", "target": "Javert", "value": 1},
      {"source": "Gueulemer", "target": "Gavroche", "value": 1},
      {"source": "Gueulemer", "target": "Eponine", "value": 1},
      {"source": "Babet", "target": "Thenardier", "value": 6},
      {"source": "Babet", "target": "Gueulemer", "value": 6},
      {"source": "Babet", "target": "Valjean", "value": 1},
      {"source": "Babet", "target": "Mme.Thenardier", "value": 1},
      {"source": "Babet", "target": "Javert", "value": 2},
      {"source": "Babet", "target": "Gavroche", "value": 1},
      {"source": "Babet", "target": "Eponine", "value": 1},
      {"source": "Claquesous", "target": "Thenardier", "value": 4},
      {"source": "Claquesous", "target": "Babet", "value": 4},
      {"source": "Claquesous", "target": "Gueulemer", "value": 4},
      {"source": "Claquesous", "target": "Valjean", "value": 1},
      {"source": "Claquesous", "target": "Mme.Thenardier", "value": 1},
      {"source": "Claquesous", "target": "Javert", "value": 1},
      {"source": "Claquesous", "target": "Eponine", "value": 1},
      {"source": "Claquesous", "target": "Enjolras", "value": 1},
      {"source": "Montparnasse", "target": "Javert", "value": 1},
      {"source": "Montparnasse", "target": "Babet", "value": 2},
      {"source": "Montparnasse", "target": "Gueulemer", "value": 2},
      {"source": "Montparnasse", "target": "Claquesous", "value": 2},
      {"source": "Montparnasse", "target": "Valjean", "value": 1},
      {"source": "Montparnasse", "target": "Gavroche", "value": 1},
      {"source": "Montparnasse", "target": "Eponine", "value": 1},
      {"source": "Montparnasse", "target": "Thenardier", "value": 1},
      {"source": "Toussaint", "target": "Cosette", "value": 2},
      {"source": "Toussaint", "target": "Javert", "value": 1},
      {"source": "Toussaint", "target": "Valjean", "value": 1},
      {"source": "Child1", "target": "Gavroche", "value": 2},
      {"source": "Child2", "target": "Gavroche", "value": 2},
      {"source": "Child2", "target": "Child1", "value": 3},
      {"source": "Brujon", "target": "Babet", "value": 3},
      {"source": "Brujon", "target": "Gueulemer", "value": 3},
      {"source": "Brujon", "target": "Thenardier", "value": 3},
      {"source": "Brujon", "target": "Gavroche", "value": 1},
      {"source": "Brujon", "target": "Eponine", "value": 1},
      {"source": "Brujon", "target": "Claquesous", "value": 1},
      {"source": "Brujon", "target": "Montparnasse", "value": 1},
      {"source": "Mme.Hucheloup", "target": "Bossuet", "value": 1},
      {"source": "Mme.Hucheloup", "target": "Joly", "value": 1},
      {"source": "Mme.Hucheloup", "target": "Grantaire", "value": 1},
      {"source": "Mme.Hucheloup", "target": "Bahorel", "value": 1},
      {"source": "Mme.Hucheloup", "target": "Courfeyrac", "value": 1},
      {"source": "Mme.Hucheloup", "target": "Gavroche", "value": 1},
      {"source": "Mme.Hucheloup", "target": "Enjolras", "value": 1}
    ]
  }
  
)}

function _d3(require){return(
require("d3@5")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["miserables.json", {url: new URL("./files/31d904f6e21d42d4963ece9c8cc4fbd75efcbdc404bf511bc79906f0a1be68b5a01e935f65123670ed04e35ca8cae3c2b943f82bf8db49c5a67c85cbb58db052", import.meta.url), mimeType: null, toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof order")).define("viewof order", ["d3","html"], _order);
  main.variable(observer("order")).define("order", ["Generators", "viewof order"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["d3","DOM","width","height","graph","margin","y","color","arc","step","viewof order","invalidation"], _chart);
  main.variable(observer("arc")).define("arc", ["margin"], _arc);
  main.variable(observer("y")).define("y", ["d3","graph","margin","height"], _y);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("height")).define("height", ["data","step","margin"], _height);
  main.variable(observer("step")).define("step", _step);
  main.variable(observer("color")).define("color", ["d3","graph"], _color);
  main.variable(observer("graph")).define("graph", ["data"], _graph);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
