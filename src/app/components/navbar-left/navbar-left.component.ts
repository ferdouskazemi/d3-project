import { Component, OnInit } from '@angular/core';
import { faChartBar , faDiagramProject , faChartLine ,faHome  } from '@fortawesome/free-solid-svg-icons';
declare var $: any;
@Component({
  selector: 'app-navbar-left',
  templateUrl: './navbar-left.component.html',
  styleUrls: ['./navbar-left.component.scss']
})

export class NavbarLeftComponent implements OnInit {

  
  constructor() { }
  faChartBar = faChartBar;
  faDiagramProject = faDiagramProject;
  faChartLine = faChartLine;
  faHome = faHome
  ngOnInit(): void {
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
      });
  });
  }



  



}
