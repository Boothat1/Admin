import { Component, OnInit, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { ProjectDashboardService } from '../project/project.service';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { FuseUtils } from '@fuse/utils';
import { merge, Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { MatTableDataSource } from '@angular/material/table';
import { Dash_Dummy, ELEMENT_DATA, series } from './data.'
import { ChangeDetectorRef } from '@angular/core';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid,
  ApexResponsive,
  ApexFill,
  ApexNonAxisChartSeries,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";
import { CommonService } from '@fuse/services/common.service';
import { Enums } from '@fuse/utils/systemEnums';
import { reject } from 'lodash';
import { ProductManageService } from 'app/main/product-manage/product-manage/product-manage.service';
type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  pieSeries: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: any;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip
  states,
  stroke: ApexStroke,
  markers
};

@Component({
  selector: 'project-dashboard',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  animations: fuseAnimations
})

export class ProjectDashboardComponent implements OnInit {
  selectData: any = [
    { id: 1, name: 'this week' },
    { id: 2, name: 'last week' },
    { id: 3, name: 'last month' },
    { id: 4, name: 'last year' }
  ];
  dashboardData: any = this._projectDashboardService.dashboardStat;
  displayedColumns: string[] = ['sr', 'img', 'name', 'username', 'email', 'mobile', 'country'];
  p = 1;
  dataSource: any = []
  config: any = {};
  dialogRef: any;
  eventMapData: any = []
  ticketMapData: any = []
  Enums = Enums;
  searchText: any = '';
  @ViewChild("total-revenue-chart", { static: false }) totalRevenueChart: ChartComponent;
  @ViewChild("total-point-sale-chart", { static: false }) totalPointSaleChart: ChartComponent;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public totalRevenueChartOptions: Partial<ChartOptions>;
  public totalPointSaleOptions: Partial<ChartOptions>;
  @ViewChild("prodComparisonchart", { static: false }) chart: ChartComponent;
  public prodComparisonchartOptions: Partial<ChartOptions>;

  @ViewChild("budgetChart", { static: false }) budgetChart: ChartComponent;
  public budgetChartOptions: Partial<ChartOptions>;
  timeFilter: any;
  selectedCategory: any;


  constructor(
    public _projectDashboardService: ProjectDashboardService,
    private _fuseProgressBarService: FuseProgressBarService,
    private _matDialog: MatDialog,
    private _matSnackBar: MatSnackBar,
    public _commonService: CommonService,
    private cd: ChangeDetectorRef
  ) {


    this.totalPointSaleOptions = {
      stroke: {
        curve: 'smooth',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 0,
          columnWidth: '10%',
          barHeight: '10%',
          distributed: false,
          rangeBarOverlap: true,
          rangeBarGroupRows: false,
          colors: {
            ranges: [{
              from: 0,
              to: 0,
              color: undefined
            }],
            backgroundBarColors: [],
            backgroundBarOpacity: 1,
            backgroundBarRadius: 0,
          },
          dataLabels: {
            position: 'top',
            maxItems: 100,
            hideOverflowingLabels: true,
          }
        }
      },
      fill: {
        colors: undefined,
        opacity: 0.0,
        type: 'solid',
        gradient: {
          shade: 'dark',
          type: "horizontal",
          shadeIntensity: 0.0,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0,
          opacityTo: 0,
          stops: [0, 50, 100],

        }
      },
      markers: {
        size: 0.001,
        colors: '#FFC954',
        strokeColors: '#FFC954',
        strokeWidth: 4,
        strokeOpacity: 1,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        shape: "circle",
        radius: 2,
        offsetX: 0,
        offsetY: 0,
        onClick: undefined,
        onDblClick: undefined,
        showNullDataPoints: true,
        hover: {
          sizeOffset: 5
        }
      },
      responsive: [
        {
          breakpoint: 426,
          options: {
            chart: {
              height: 280,
            },

          }
        }
      ],
      states: {
        active: {
          filter: {
            type: 'none' /* none, lighten, darken */
          }
        },
        hover: {
          filter: {
            type: 'none',
            value: 0,
          }
        },
        normal: {
          filter: {
            type: 'none',
            value: 0,
          }
        },
      },

      series: [
        {
          // name: "Sales KWD 110C",
          data: this.dashboardData.salesChart.series    //provided values
        }
      ],
      chart: {
        height: 400,
        type: "area",
        fontFamily: 'manropeSemiBold',
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          }
        },
        toolbar: {
          show: false,
        },
        selection: {
          enabled: true,
        },
        dropShadow: {
          enabled: false,
          enabledOnSeries: undefined,
          top: 0,
          left: 0,
          blur: 0,
          color: '#000',
          opacity: 0
        },
      },
      colors: [
        "#FFC954",
      ],
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: true
        , yaxis: {
          lines: {
            show: true
          }
        }, xaxis: {
          lines: {
            show: false
          }
        },
        strokeDashArray: 5,
      },
      xaxis: {
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: false,
        },
        categories: this.dashboardData.salesChart.labels,       //set labels
        labels: {
          show: true,
          minHeight: 50,
          maxHeight: 20,
          width: 5,
          style: {
            colors: [
              "#272D3B"
            ],
            fontSize: "12px"
          }
        }
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return "KWD " + value;
          }
        },
      }
    };

    this.prodComparisonchartOptions = {    
      dataLabels: {
        enabled: false,
        style: {

        },
        offsetX: 30
      },
      series: this.dashboardData.comparisonChart.series,
      chart: {
        type: "bar",
        height: 'auto',
        
        fontFamily: 'manropeMedium',
        stacked: true,
        stackType: "normal",

        toolbar: {
          show: false
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 426,
          options: {
            legend: {
              itemMargin: {
                horizontal: 5,
                vertical: 0
              },
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
          borderRadius: 4,
          barHeight: '100%',
        },
      },
      xaxis: {
        categories: this.dashboardData.comparisonChart.labels,
        maxHeight: 120,
        width: 50,
      },

      legend: {
        position: "top",
        offsetX: 0,
        offsetY: 0,
        labels: {
          colors: ['#7764E4', '#FB6340', '#FEB969', '#F53C56'],
          useSeriesColors: false
        },
        markers: {
          width: 18,
          height: 10,
          radius: 5,
          offsetX: 0,
          offsetY: 0,
          fillColors: ['#7764E4', '#FB6340', '#FEB969', '#F53C56']
        },
        itemMargin: {
          horizontal: 15,
          vertical: 20
        },
      },
      fill: {
        opacity: 1,
        colors: ['#7764E4', '#FB6340', '#FEB969', '#F53C56']
      }
    };
    this.budgetChartOptions = {
      colors: ['#11CDEF', '#2DCE98', '#F53C56', '#FEB969','C3E5AE','#F4BBBB'],
      stroke: {
        show: false
      },
      plotOptions: {
        pie: {
          expandOnClick: true,
          donut: {
            size: '60%',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '14',
                fontFamily: 'Manrope',
                color: '#000',
                offsetY: 0,
                // formatter: (val: string) => {
                //   return ''
                // }
              },
              value: {
                show: true,
                fontSize: '10',
                fontFamily: 'manrope',
                fontWeight: 400,
                color: '#000',
                offsetY: 3,
                // label:'Total Budget',
                // formatter: (val: string) => {
                //   return 'hello there'
                // }
              },
              total: {
                show: true,
                showAlways: true,
                fontSize: '14',
                fontFamily: 'manropeMedium',
                fontWeight: 400,
                color: '#000',

                label: this.dashboardData.pieChart.totalRevenue,
                formatter: function (w) {
                  return "Total Revenue";
                }
              }
            }
          }
        }
      },
      pieSeries: this.dashboardData.pieChart.series,
      labels: this.dashboardData.pieChart.labels,
      dataLabels: {
        style: {
          fontSize: '0px',
        },
        offsetX: 30
      },
      responsive: [
        {
          breakpoint: 1024,
          options: {
            chart: {
              width: "76%",

            },

          }
        },
        {
          breakpoint: 1440,
          options: {
            chart: {
              width: "76%",

            },

          }
        },
        {
          breakpoint: 426,
          options: {
            chart: {
              width: '100%',
            },

          }
        }
      ],
      chart: {
        dropShadow: {
          // enabled:true,
          // color:"#000",

        },
        type: "donut",
        height: "auto",
        fontFamily: 'manrope',
        width: "73%"

      },
      fill: {

        // type: 'gradient'
      },

      legend: {
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        position: 'top',
        // horizontalAlign: 'center', 
        floating: false,
        fontSize: '12px',
        fontFamily: 'manropeBold',
        fontWeight: 400,
        formatter: undefined,
        inverseOrder: false,
        width: undefined,
        labels: {
          // colors: ['#11CDEF', '#2DCE98', '#F53C56', '#FEB969','C3E5AE','#F4BBBB'],
        },
        height: undefined,
        tooltipHoverFormatter: undefined,
        customLegendItems: [],
        // offsetX: 100,
        offsetY: 0,
        markers: {
          width: 12,
          height: 12,
          strokeWidth: 0,
          strokeColor: '#fff',
          radius: 12,
          customHTML: undefined,
          // fillColors: ['#11CDEF', '#2DCE98', '#F53C56', '#FEB969'],
          fillColors: ['#11CDEF', '#2DCE98', '#F53C56', '#FEB969','C3E5AE','#F4BBBB'],
        },
        itemMargin: {
          horizontal: 5,
          vertical: 10
        },

      },
      tooltip: {
        enabled: true,
        enabledOnSeries: undefined,
        shared: true,
        followCursor: true,
        intersect: false,
        inverseOrder: false,
        custom: undefined,
        fillSeriesColor: true,
        theme: 'dark',
        style: {
          fontSize: '12px',
          fontFamily: undefined,
        },
        onDatasetHover: {
          highlightDataSeries: true,

        },
        x: {
          show: true,
          format: 'dd MMM',
          formatter: undefined,
        },
        y: {
          formatter: undefined,
          title: {
            formatter: (seriesName) => seriesName,
          },
        },
        z: {
          formatter: undefined,
          title: 'Size: '
        },
        marker: {
          show: true,
        },
        items: {
        },
        fixed: {
          enabled: false,
          position: 'topRight',
          offsetX: 5,
          offsetY: 0,
        },
      },

    };

    console.log("this.comparisionChartData=>", this._projectDashboardService.dashboardStat);
    console.log("sale chart data in start=>>>", this.totalPointSaleOptions);

    this.dataSource = new MatTableDataSource(this._projectDashboardService.recentSellers);




  }



  ngOnInit(): void {

  }

  fetchDataInDashboard(timeFilter?, category?) {
    this._fuseProgressBarService.show()
    this._commonService.getDashboard(timeFilter, category).then((result: any) => {
      if (result.status == 200) {
        this._fuseProgressBarService.hide()
        this.dashboardData = result.data;
        if (category) {
         
          let newChartOptions = { ...this.prodComparisonchartOptions }
         
          newChartOptions.series = this.dashboardData.comparisonChart.series;
          newChartOptions.xaxis.categories = this.dashboardData.comparisonChart.labels;

          newChartOptions.colors = ['#7764E4', '#FB6340', '#FEB969', '#F53C56'];
          // this.prodComparisonchartOptions= {}
          this.prodComparisonchartOptions = { ...newChartOptions }

          console.log("this.prodComparisonchartOptions on category filter",this.prodComparisonchartOptions);

          
        } else {

       
          let newProdComparisonChartOptions = { ...this.prodComparisonchartOptions }
          newProdComparisonChartOptions.series = this.dashboardData.comparisonChart.series;
          newProdComparisonChartOptions.xaxis.categories = this.dashboardData.comparisonChart.labels;
          newProdComparisonChartOptions.colors = ['#7764E4', '#FB6340', '#FEB969', '#F53C56']
          this.prodComparisonchartOptions = { ...newProdComparisonChartOptions }

          // sale chart  filter
          let newTotalPointChartOptions = { ...this.totalPointSaleOptions }
          newTotalPointChartOptions.series[0].data = this.dashboardData.salesChart.series;
          newTotalPointChartOptions.xaxis.categories = this.dashboardData.salesChart.labels;
          newTotalPointChartOptions.colors = ['#FFC954']
          this.totalPointSaleOptions = { ...newTotalPointChartOptions }

          // revenue chart  filter
          let newTotalRevenueChartOptions = { ...this.budgetChartOptions }
          newTotalRevenueChartOptions.series = this.dashboardData.pieChart.series;
          newTotalRevenueChartOptions.labels = this.dashboardData.pieChart.labels;
          newTotalRevenueChartOptions.plotOptions.pie.donut.labels.total.label = this.dashboardData.pieChart.totalRevenue;
          newTotalRevenueChartOptions.colors = ['#11CDEF', '#2DCE98', '#F53C56', '#FEB969']
          this.budgetChartOptions = { ...newTotalRevenueChartOptions }
        }

      } else {
        this._fuseProgressBarService.hide()
      }
    })
  }
  commonFilter(event) {
    console.log(event.value);
    this.timeFilter = event.value

    this.fetchDataInDashboard(this.timeFilter)
  }

  categoryFilter(event) {
    this.selectedCategory = event.value;
    this.fetchDataInDashboard(this.timeFilter, this.selectedCategory)
  }
}

