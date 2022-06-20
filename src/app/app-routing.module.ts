import { WalmartsGrowthComponent } from './pages/walmarts-growth/walmarts-growth.component';
import { IcelandicPopulationComponent } from './pages/icelandic-population/icelandic-population.component';
import { ZoomableTreemapComponent } from './pages/zoomable-treemap/zoomable-treemap.component';
import { ZoomableCirclePackingComponent } from './pages/zoomable-circle-packing/zoomable-circle-packing.component';
import { TemporalForceDirectedGraphComponent } from './pages/temporal-force-directed-graph/temporal-force-directed-graph.component';
import { HierarchicalBarChartComponent } from './pages/hierarchical-bar-chart/hierarchical-bar-chart.component';
import { ScatterplotTourComponent } from './pages/scatterplot-tour/scatterplot-tour.component';
import { WorldTourComponent } from './pages/world-tour/world-tour.component';
import { DotPlotComponent } from './pages/dot-plot/dot-plot.component';
import { StreamgraphTransitionsComponent } from './pages/streamgraph-transitions/streamgraph-transitions.component';
import { ParallelSetsComponent } from './pages/parallel-sets/parallel-sets.component';
import { TheWealthHealthOfNationsComponent } from './pages/the-wealth-health-of-nations/the-wealth-health-of-nations.component';
import { ElectricUsageComponent } from './pages/electric-usage/electric-usage.component';
import { CollapsibleTreeComponent } from './pages/collapsible-tree/collapsible-tree.component';
import { WorldHistoryTimelineComponent } from './pages/world-history-timeline/world-history-timeline.component';
import { BrushableScatterplotMatrixComponent } from './pages/brushable-scatterplot-matrix/brushable-scatterplot-matrix.component';
import { ArcDiagramComponent } from './pages/arc-diagram/arc-diagram.component';
import { SankeyComponent } from './pages/sankey/sankey.component';
import { BarChartRaceComponent } from './pages/bar-chart-race/bar-chart-race.component';
import { ZoomableSunburstComponent } from './pages/zoomable-sunburst/zoomable-sunburst.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:"" , component:HomeComponent , pathMatch:"full"},
  {path:"zoomable-sunburst" , component: ZoomableSunburstComponent},
  {path:"bar-chart-race" , component: BarChartRaceComponent},
  {path:"sankey" , component: SankeyComponent},
  {path:"arc-diagram" , component: ArcDiagramComponent},
  {path:"world-history-timeline" , component: WorldHistoryTimelineComponent},
  {path:"brushable-scatterplot-matrix" , component: BrushableScatterplotMatrixComponent},
  {path:"collapsible-tree" , component: CollapsibleTreeComponent},
  {path:"electric-usage" , component: ElectricUsageComponent},
  {path:"the-wealth-health-of-nations" , component: TheWealthHealthOfNationsComponent},
  {path:"parallel-sets" , component: ParallelSetsComponent},
  {path:"streamgraph-transitions" , component: StreamgraphTransitionsComponent},
  {path:"dot-plot" , component: DotPlotComponent},
  {path:"world-tour" , component: WorldTourComponent},
  {path:"scatterplot-tour" , component: ScatterplotTourComponent},
  {path:"hierarchical-bar-chart" , component: HierarchicalBarChartComponent},
  {path:"temporal-force-directed-graph" , component: TemporalForceDirectedGraphComponent},
  {path:"zoomable-circle-packing" , component: ZoomableCirclePackingComponent},
  {path: "zoomable-treemap" , component: ZoomableTreemapComponent},
  {path: "icelandic-population" , component: IcelandicPopulationComponent},
  {path: "walmarts-growth" , component:  WalmartsGrowthComponent}
  

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
