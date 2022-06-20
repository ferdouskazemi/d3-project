import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarChartRaceComponent } from './pages/bar-chart-race/bar-chart-race.component';
import { CollapsibleTreeComponent } from './pages/collapsible-tree/collapsible-tree.component';
import { WorldHistoryTimelineComponent } from './pages/world-history-timeline/world-history-timeline.component';
import { ElectricUsageComponent } from './pages/electric-usage/electric-usage.component';
import { ZoomableSunburstComponent } from './pages/zoomable-sunburst/zoomable-sunburst.component';
import { BrushableScatterplotMatrixComponent } from './pages/brushable-scatterplot-matrix/brushable-scatterplot-matrix.component';
import { TheWealthHealthOfNationsComponent } from './pages/the-wealth-health-of-nations/the-wealth-health-of-nations.component';
import { ParallelSetsComponent } from './pages/parallel-sets/parallel-sets.component';
import { StreamgraphTransitionsComponent } from './pages/streamgraph-transitions/streamgraph-transitions.component';
import { SankeyComponent } from './pages/sankey/sankey.component';
import { ArcDiagramComponent } from './pages/arc-diagram/arc-diagram.component';
import { DotPlotComponent } from './pages/dot-plot/dot-plot.component';
import { NavbarLeftComponent } from './components/navbar-left/navbar-left.component';
import { HomeComponent } from './home/home.component';
import { ContainerComponent } from './components/container/container.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { WorldTourComponent } from './pages/world-tour/world-tour.component';
import { ScatterplotTourComponent } from './pages/scatterplot-tour/scatterplot-tour.component';
import { HierarchicalBarChartComponent } from './pages/hierarchical-bar-chart/hierarchical-bar-chart.component';
import { TemporalForceDirectedGraphComponent } from './pages/temporal-force-directed-graph/temporal-force-directed-graph.component';
import { ZoomableCirclePackingComponent } from './pages/zoomable-circle-packing/zoomable-circle-packing.component';
import { ZoomableTreemapComponent } from './pages/zoomable-treemap/zoomable-treemap.component';
import { IcelandicPopulationComponent } from './pages/icelandic-population/icelandic-population.component';
import { WalmartsGrowthComponent } from './pages/walmarts-growth/walmarts-growth.component';

@NgModule({
  declarations: [
    AppComponent,
    BarChartRaceComponent,
    CollapsibleTreeComponent,
    WorldHistoryTimelineComponent,
    ElectricUsageComponent,
    ZoomableSunburstComponent,
    BrushableScatterplotMatrixComponent,
    TheWealthHealthOfNationsComponent,
    ParallelSetsComponent,
    StreamgraphTransitionsComponent,
    SankeyComponent,
    ArcDiagramComponent,
    DotPlotComponent,
    NavbarLeftComponent,
    HomeComponent,
    ContainerComponent,
    WorldTourComponent,
    ScatterplotTourComponent,
    HierarchicalBarChartComponent,
    TemporalForceDirectedGraphComponent,
    ZoomableCirclePackingComponent,
    ZoomableTreemapComponent,
    IcelandicPopulationComponent,
    WalmartsGrowthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
