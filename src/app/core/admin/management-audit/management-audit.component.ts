import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Audit } from 'src/assets/mock/admin-audit/audit.model'
import { MocksService } from 'src/app/shared/services/mocks/mocks.service';
// import { AuditData } from 'src/assets/mock/admin-audit/audit.data.json'
import * as moment from 'moment';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import swal from "sweetalert2";
am4core.useTheme(am4themes_animated);

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox'
}

@Component({
  selector: 'app-management-audit',
  templateUrl: './management-audit.component.html',
  styleUrls: ['./management-audit.component.scss']
})
export class ManagementAuditComponent implements OnInit, OnDestroy {

  // Chart
  private chart1 : any;
  private chart2 : any;
  private chart3 : any;
  private chart4 : any;
  private chart5 : any;

  dataChart1: any[] = []
  dataChart2: any[] = []
  dataChart3: any[] = []

  chartJanPost: number = 0
  chartJanGet: number = 0
  chartJanUpdate: number = 0
  chartJanDelete: number = 0
  chartFebPost: number = 0
  chartFebGet: number = 0
  chartFebUpdate: number = 0
  chartFebDelete: number = 0
  chartMarchPost: number = 0
  chartMarchGet: number = 0
  chartMarchUpdate: number = 0
  chartMarchDelete: number = 0
  chartAprPost: number = 0
  chartAprGet: number = 0
  chartAprUpdate: number = 0
  chartAprDelete: number = 0
  chartMayPost: number = 0
  chartMayGet: number = 0
  chartMayUpdate: number = 0
  chartMayDelete: number = 0
  chartJunPost: number = 0
  chartJunGet: number = 0
  chartJunUpdate: number = 0
  chartJunDelete: number = 0
  chartJulPost: number = 0
  chartJulGet: number = 0
  chartJulUpdate: number = 0
  chartJulDelete: number = 0
  chartAugPost: number = 0
  chartAugGet: number = 0
  chartAugUpdate: number = 0
  chartAugDelete: number = 0
  chartSepPost: number = 0
  chartSepGet: number = 0
  chartSepUpdate: number = 0
  chartSepDelete: number = 0
  chartOctPost: number = 0
  chartOctGet: number = 0
  chartOctUpdate: number = 0
  chartOctDelete: number = 0
  chartNovPost: number = 0
  chartNovGet: number = 0
  chartNovUpdate: number = 0
  chartNovDelete: number = 0
  chartDecPost: number = 0
  chartDecGet: number = 0
  chartDecUpdate: number = 0
  chartDecDelete: number = 0

  // Datepicker
  bsDPConfig = { 
    isAnimated: true, 
    containerClass: 'theme-default'
  }

  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: Audit[] = []
  SelectionType = SelectionType;

  constructor(
    private mockService: MocksService,
    private zone: NgZone
  ) {
    this.getData1()
    this.getData2()
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart1) {
        console.log("Chart disposed")
        this.chart1.dispose()
      }
      if (this.chart2) {
        console.log("Chart disposed")
        this.chart2.dispose()
      }
      if (this.chart3) {
        console.log("Chart disposed")
        this.chart3.dispose()
      }
      if (this.chart4) {
        console.log("Chart disposed")
        this.chart4.dispose()
      }
      if (this.chart5) {
        console.log("Chart disposed")
        this.chart5.dispose()
      }
    })
  }

  getData1() {
    this.mockService.getAll('admin-audit/audit.data.json').subscribe(
      (res) => {
        // Success
        this.tableRows = [...res]
        this.tableTemp = this.tableRows.map((prop, key) => {
          return {
            ...prop,
            id: key
          };
        });
        console.log('Svc: ', this.tableTemp)
        this.resetCharts()
        this.calculateCharts()
      },
      () => {
        // Unsuccess
      },
      () => {
        // After
        this.getCharts1()
      }
    )
  }

  getData2() {
    this.mockService.getAll('admin-report/report-data-1.json').subscribe(
      (res) => {
        // Success
        this.dataChart1 = res
      },
      () => {
        // Unsuccess
      },
      () => {
        // After
        this.mockService.getAll('admin-report/report-data-2.json').subscribe(
          (res) => {
            // Success
            this.dataChart2 = res
          },
          () => {
            // Unsuccess
          },
          () => {
            // After
            this.mockService.getAll('admin-report/report-data-3.json').subscribe(
              (res) => {
                // Success
                this.dataChart3 = res
              },
              () => {
                // Unsuccess
              },
              () => {
                // After
                this.getCharts2()
              }
            )
          }
        )
      }
    )
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value;
    this.tableTemp = this.tableRows.filter(function (d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

  onSelect({ selected }) {
    this.tableSelected.splice(0, this.tableSelected.length);
    this.tableSelected.push(...selected);
  }

  onActivate(event) {
    this.tableActiveRow = event.row;
  }

  getCharts1() {
    this.zone.runOutsideAngular(() => {
      this.getChartAudit1()
    })
  }

  getCharts2() {
    this.zone.runOutsideAngular(() => {
      this.getChartAudit2()
      this.getChartAudit3()
      this.getChartAudit4()
      this.getChartAudit5()
    })
  }

  getChartAudit1() {
    let chart = am4core.create('chartdivauditmanagement1', am4charts.XYChart)
    chart.colors.step = 2;

    chart.legend = new am4charts.Legend()
    chart.legend.position = 'top'
    chart.legend.paddingBottom = 20
    chart.legend.labels.template.maxWidth = 95

    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    xAxis.dataFields.category = 'category'
    xAxis.renderer.cellStartLocation = 0.1
    xAxis.renderer.cellEndLocation = 0.9
    xAxis.renderer.grid.template.location = 0;

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    function createSeries(value, name) {
      let series = chart.series.push(new am4charts.ColumnSeries())
      series.dataFields.valueY = value
      series.dataFields.categoryX = 'category'
      series.name = name

      series.events.on("hidden", arrangeColumns);
      series.events.on("shown", arrangeColumns);

      let bullet = series.bullets.push(new am4charts.LabelBullet())
      bullet.interactionsEnabled = false
      bullet.dy = 30;
      bullet.label.text = '{valueY}'
      bullet.label.fill = am4core.color('#ffffff')

      return series;
    }

    chart.data = [
      {
        category: 'POST',
        jan: this.chartJanPost,
        feb: this.chartFebPost,
        march: this.chartMarchPost,
        apr: this.chartAprPost,
        may: this.chartMayPost,
        Jun: this.chartJunPost,
        jul: this.chartJulPost,
        aug: this.chartAugPost,
        sep: this.chartSepPost,
        oct: this.chartOctPost,
        nov: this.chartNovPost,
        dec: this.chartDecPost
      },
      {
        category: 'GET',
        jan: this.chartJanGet,
        feb: this.chartFebGet,
        march: this.chartMarchGet,
        apr: this.chartAprGet,
        may: this.chartMayGet,
        Jun: this.chartJunGet,
        jul: this.chartJulGet,
        aug: this.chartAugGet,
        sep: this.chartSepGet,
        oct: this.chartOctGet,
        nov: this.chartNovGet,
        dec: this.chartDecGet
      },
      {
        category: 'UPDATE',
        jan: this.chartJanUpdate,
        feb: this.chartFebUpdate,
        march: this.chartMarchUpdate,
        apr: this.chartAprUpdate,
        may: this.chartMayUpdate,
        Jun: this.chartJunUpdate,
        jul: this.chartJulUpdate,
        aug: this.chartAugUpdate,
        sep: this.chartSepUpdate,
        oct: this.chartOctUpdate,
        nov: this.chartNovUpdate,
        dec: this.chartDecUpdate
      },
      {
        category: 'DELETE',
        jan: this.chartJanDelete,
        feb: this.chartFebDelete,
        march: this.chartMarchDelete,
        apr: this.chartAprDelete,
        may: this.chartMayDelete,
        Jun: this.chartJunDelete,
        jul: this.chartJulDelete,
        aug: this.chartAugDelete,
        sep: this.chartSepDelete,
        oct: this.chartOctDelete,
        nov: this.chartNovDelete,
        dec: this.chartDecDelete
      }
    ]


    createSeries('jan', 'Jan');
    createSeries('feb', 'Feb');
    createSeries('march', 'Mac');
    createSeries('apr', 'Apr');
    createSeries('may', 'Mei');
    createSeries('Jun', 'Jun');
    createSeries('jul', 'Jul');
    createSeries('aug', 'Ogos');
    createSeries('sep', 'Sep');
    createSeries('octove', 'Okt');
    createSeries('nov', 'Nov');
    createSeries('dec', 'Dis');

    function arrangeColumns() {

      let series = chart.series.getIndex(0);

      let w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
      if (series.dataItems.length > 1) {
        let x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
        let x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
        let delta = ((x1 - x0) / chart.series.length) * w;
        if (am4core.isNumber(delta)) {
          let middle = chart.series.length / 2;

          let newIndex = 0;
          chart.series.each(function (series) {
            if (!series.isHidden && !series.isHiding) {
              series.dummyData = newIndex;
              newIndex++;
            }
            else {
              series.dummyData = chart.series.indexOf(series);
            }
          })
          let visibleCount = newIndex;
          let newMiddle = visibleCount / 2;

          chart.series.each(function (series) {
            let trueIndex = chart.series.indexOf(series);
            let newIndex = series.dummyData;

            let dx = (newIndex - trueIndex + middle - newMiddle) * delta

            series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
            series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
          })
        }
      }
    }
    
    this.chart1 = chart;
  }

  getChartAudit2() {
    let chart = am4core.create("chartdivauditmanagement2", am4charts.XYChart);
    chart.paddingRight = 20;

    let data = this.dataChart1

    chart.data = data;
    chart.dateFormatter.inputDateFormat = "yyyy";

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;
    dateAxis.baseInterval = { timeUnit: "year", count: 2 };

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;

    let series = chart.series.push(new am4charts.StepLineSeries());
    series.dataFields.dateX = "year";
    series.dataFields.valueY = "amount";
    series.tooltipText = "{valueY.amount}";
    series.strokeWidth = 3;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.cursor.fullWidthLineX = true;
    chart.cursor.lineX.strokeWidth = 0;
    chart.cursor.lineX.fill = chart.colors.getIndex(2);
    chart.cursor.lineX.fillOpacity = 0.1;

    chart.scrollbarX = new am4core.Scrollbar();

    this.chart2 = chart
  }

  getChartAudit3() {
    let chart = am4core.create("chartdivauditmanagement3", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    let data = [];
    let open = 100;
    let close = 250;

    for (var i = 1; i < 120; i++) {
      open += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 4);
      close = Math.round(open + Math.random() * 5 + i / 5 - (Math.random() < 0.5 ? 1 : -1) * Math.random() * 2);
      data.push({ date: new Date(2018, 0, i), open: open, close: close });
    }

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.openValueY = "open";
    series.dataFields.valueY = "close";
    series.tooltipText = "open: {openValueY.value} close: {valueY.value}";
    series.sequencedInterpolation = true;
    series.fillOpacity = 0.3;
    series.defaultState.transitionDuration = 1000;
    series.tensionX = 0.8;

    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.dateX = "date";
    series2.dataFields.valueY = "open";
    series2.sequencedInterpolation = true;
    series2.defaultState.transitionDuration = 1500;
    series2.stroke = chart.colors.getIndex(6);
    series2.tensionX = 0.8;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.scrollbarX = new am4core.Scrollbar();

    this.chart3 = chart
  }

  getChartAudit4() {
    let chart = am4core.create("chartdivauditmanagement4", am4charts.XYChart);

    // Add data
    chart.data = this.dataChart2

    // Create axes
    let valueAxisX = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxisX.title.text = 'X Axis';
    valueAxisX.renderer.minGridDistance = 40;

    // Create value axis
    let valueAxisY = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxisY.title.text = 'Y Axis';

    // Create series
    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.valueY = "ay";
    lineSeries.dataFields.valueX = "ax";
    lineSeries.strokeOpacity = 0;

    let lineSeries2 = chart.series.push(new am4charts.LineSeries());
    lineSeries2.dataFields.valueY = "by";
    lineSeries2.dataFields.valueX = "bx";
    lineSeries2.strokeOpacity = 0;

    // Add a bullet
    let bullet = lineSeries.bullets.push(new am4charts.Bullet());

    // Add a triangle to act as am arrow
    let arrow = bullet.createChild(am4core.Triangle);
    arrow.horizontalCenter = "middle";
    arrow.verticalCenter = "middle";
    arrow.strokeWidth = 0;
    arrow.fill = chart.colors.getIndex(0);
    arrow.direction = "top";
    arrow.width = 12;
    arrow.height = 12;

    // Add a bullet
    let bullet2 = lineSeries2.bullets.push(new am4charts.Bullet());

    // Add a triangle to act as am arrow
    let arrow2 = bullet2.createChild(am4core.Triangle);
    arrow2.horizontalCenter = "middle";
    arrow2.verticalCenter = "middle";
    arrow2.rotation = 180;
    arrow2.strokeWidth = 0;
    arrow2.fill = chart.colors.getIndex(3);
    arrow2.direction = "top";
    arrow2.width = 12;
    arrow2.height = 12;

    //add the trendlines
    let trend = chart.series.push(new am4charts.LineSeries());
    trend.dataFields.valueY = "value2";
    trend.dataFields.valueX = "value";
    trend.strokeWidth = 2
    trend.stroke = chart.colors.getIndex(0);
    trend.strokeOpacity = 0.7;
    trend.data = [
      { "value": 1, "value2": 2 },
      { "value": 12, "value2": 11 }
    ];

    let trend2 = chart.series.push(new am4charts.LineSeries());
    trend2.dataFields.valueY = "value2";
    trend2.dataFields.valueX = "value";
    trend2.strokeWidth = 2
    trend2.stroke = chart.colors.getIndex(3);
    trend2.strokeOpacity = 0.7;
    trend2.data = [
      { "value": 1, "value2": 1 },
      { "value": 12, "value2": 19 }
    ];

    //scrollbars
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();

    this.chart4 = chart
  }

  getChartAudit5() {
    let chart = am4core.create("chartdivauditmanagement5", am4charts.XYChart);

    // Add data
    chart.data = this.dataChart3

    // Set input format for the dates
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.tooltipText = "{value}"
    series.strokeWidth = 2;
    series.minBulletDistance = 15;

    // Drop-shaped tooltips
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.label.minWidth = 40;
    series.tooltip.label.minHeight = 40;
    series.tooltip.label.textAlign = "middle";
    series.tooltip.label.textValign = "middle";

    // Make bullets grow on hover
    let bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color("#fff");

    let bullethover = bullet.states.create("hover");
    bullethover.properties.scale = 1.3;

    // Make a panning cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panXY";
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;

    // Create vertical scrollbar and place it before the value axis
    chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY.parent = chart.leftAxesContainer;
    chart.scrollbarY.toBack();

    // Create a horizontal scrollbar with previe and place it underneath the date axis
    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;
    chart.scrollbarX.parent = chart.bottomAxesContainer;

    dateAxis.start = 0.79;
    dateAxis.keepSelection = true;

    this.chart5 = chart

  }

  resetCharts() {
  this.chartJanPost = 0
  this.chartJanGet = 0
  this.chartJanUpdate = 0
  this.chartJanDelete = 0
  this.chartFebPost = 0
  this.chartFebGet = 0
  this.chartFebUpdate = 0
  this.chartFebDelete = 0
  this.chartMarchPost = 0
  this.chartMarchGet = 0
  this.chartMarchUpdate = 0
  this.chartMarchDelete = 0
  this.chartAprPost = 0
  this.chartAprGet = 0
  this.chartAprUpdate = 0
  this.chartAprDelete = 0
  this.chartMayPost = 0
  this.chartMayGet = 0
  this.chartMayUpdate = 0
  this.chartMayDelete = 0
  this.chartJunPost = 0
  this.chartJunGet = 0
  this.chartJunUpdate = 0
  this.chartJunDelete = 0
  this.chartJulPost = 0
  this.chartJulGet = 0
  this.chartJulUpdate = 0
  this.chartJulDelete = 0
  this.chartAugPost = 0
  this.chartAugGet = 0
  this.chartAugUpdate = 0
  this.chartAugDelete = 0
  this.chartSepPost = 0
  this.chartSepGet = 0
  this.chartSepUpdate = 0
  this.chartSepDelete = 0
  this.chartOctPost = 0
  this.chartOctGet = 0
  this.chartOctUpdate = 0
  this.chartOctDelete = 0
  this.chartNovPost = 0
  this.chartNovGet = 0
  this.chartNovUpdate = 0
  this.chartNovDelete = 0
  this.chartDecPost = 0
  this.chartDecGet = 0
  this.chartDecUpdate = 0
  this.chartDecDelete = 0
  }

  calculateCharts() {
    this.tableRows.forEach(
      (row) => {
        let checkerType = row.action
        let checkerDate = moment(row.created_at)
        let checkerDateMonth = checkerDate.month()
        console.log(checkerDateMonth)
        if (checkerDateMonth == 0) {
          if (checkerType == 'POST') {
            this.chartJanPost += 1
          }
          else if (checkerType == 'GET') {
            this.chartJanGet += 1
          }
          else if (checkerType == 'UPDATE') {
            this.chartJanUpdate += 1
          }
          else if (checkerType == 'DELETE') {
            this.chartJanDelete += 1
          }
        }
        else if (checkerDateMonth == 1) {
          if (checkerType == 'POST') {
            this.chartFebPost += 1
          }
          else if (checkerType == 'GET') {
            this.chartFebGet += 1
          }
          else if (checkerType == 'UPDATE') {
            this.chartFebUpdate += 1
          }
          else if (checkerType == 'DELETE') {
            this.chartFebDelete += 1
          }
        }
        else if (checkerDateMonth == 2) {
          if (checkerType == 'POST') {
            this.chartMarchPost += 1
          }
          else if (checkerType == 'GET') {
            this.chartMarchGet += 1
          }
          else if (checkerType == 'UPDATE') {
            this.chartMarchUpdate += 1
          }
          else if (checkerType == 'DELETE') {
            this.chartMarchDelete += 1
          }
        }
        else if (checkerDateMonth == 3) {
          if (checkerType == 'POST') {
            this.chartAprPost += 1
          }
          else if (checkerType == 'GET') {
            this.chartAprGet += 1
          }
          else if (checkerType == 'UPDATE') {
            this.chartAprUpdate += 1
          }
          else if (checkerType == 'DELETE') {
            this.chartAprDelete += 1
          }
        }
        else if (checkerDateMonth == 4) {
          if (checkerType == 'POST') {
            this.chartMayPost += 1
          }
          else if (checkerType == 'GET') {
            this.chartMayGet += 1
          }
          else if (checkerType == 'UPDATE') {
            this.chartMayUpdate += 1
          }
          else if (checkerType == 'DELETE') {
            this.chartMayDelete += 1
          }
        }
        else if (checkerDateMonth == 5) {
          if (checkerType == 'POST') {
            this.chartJunPost += 1
          }
          else if (checkerType == 'GET') {
            this.chartJunGet += 1
          }
          else if (checkerType == 'UPDATE') {
            this.chartJunUpdate += 1
          }
          else if (checkerType == 'DELETE') {
            this.chartJunDelete += 1
          }
        }
        else if (checkerDateMonth == 6) {
          if (checkerType == 'POST') {
            this.chartJulPost += 1
          }
          else if (checkerType == 'GET') {
            this.chartJulGet += 1
          }
          else if (checkerType == 'UPDATE') {
            this.chartJulUpdate += 1
          }
          else if (checkerType == 'DELETE') {
            this.chartJulDelete += 1
          }
        }
        else if (checkerDateMonth == 7) {
          if (checkerType == 'POST') {
            this.chartAugPost += 1
          }
          else if (checkerType == 'GET') {
            this.chartAugGet += 1
          }
          else if (checkerType == 'UPDATE') {
            this.chartAugUpdate += 1
          }
          else if (checkerType == 'DELETE') {
            this.chartAugDelete += 1
          }
        }
        else if (checkerDateMonth == 8) {
          if (checkerType == 'POST') {
            this.chartSepPost += 1
          }
          else if (checkerType == 'GET') {
            this.chartSepGet += 1
          }
          else if (checkerType == 'UPDATE') {
            this.chartSepUpdate += 1
          }
          else if (checkerType == 'DELETE') {
            this.chartSepDelete += 1
          }
        }
        else if (checkerDateMonth == 9) {
          if (checkerType == 'POST') {
            this.chartOctPost += 1
          }
          else if (checkerType == 'GET') {
            this.chartOctGet += 1
          }
          else if (checkerType == 'UPDATE') {
            this.chartOctUpdate += 1
          }
          else if (checkerType == 'DELETE') {
            this.chartOctDelete += 1
          }
        }
        else if (checkerDateMonth == 10) {
          if (checkerType == 'POST') {
            this.chartNovPost += 1
          }
          else if (checkerType == 'GET') {
            this.chartNovGet += 1
          }
          else if (checkerType == 'UPDATE') {
            this.chartNovUpdate += 1
          }
          else if (checkerType == 'DELETE') {
            this.chartNovDelete += 1
          }
        }
        else if (checkerDateMonth == 11) {
          if (checkerType == 'POST') {
            this.chartDecPost += 1
          }
          else if (checkerType == 'GET') {
            this.chartDecGet += 1
          }
          else if (checkerType == 'UPDATE') {
            this.chartDecUpdate += 1
          }
          else if (checkerType == 'DELETE') {
            this.chartDecDelete += 1
          }
        }
      }
    )
  }

  successSwal(task) {
    swal.fire({
      title: "Berjaya",
      text: "Berjaya " + task + "!",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
    });
  }

}
