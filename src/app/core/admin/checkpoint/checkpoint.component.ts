import {
  Component,
  OnInit,
  NgZone,
  OnDestroy,
  TemplateRef,
} from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_moonrisekingdom from "@amcharts/amcharts4/themes/moonrisekingdom";
import am4themes_spiritedaway from "@amcharts/amcharts4/themes/spiritedaway";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_timeline from "@amcharts/amcharts4/plugins/timeline"; 

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-checkpoint",
  templateUrl: "./checkpoint.component.html",
  styleUrls: ["./checkpoint.component.scss"],
})
export class CheckpointComponent implements OnInit {
  //table
  entries: number = 3;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any = [
    {
      project: "101",
      date: "6/1/2020",
      rating: "87",
      quest: "Perlu direspon dengan lebih cepat.",
      name: "Raziman Razak",
      status: "checked",
      permit: "A341",
      tel: "0123456789",
      report: "Laporan pembayaran tidak diterima."
    },
    {
      project: "102",
      date: "8/5/2020",
      rating: "79",
      quest: "Kemas kini berita yang lebih terkini dan padat.",
      name: "Hasnah Ali",
      status: "inproses",
      permit: "A685",
      tel: "0135792468",
      report: "Laporan untuk pegawai terlibat kemas kini borang."
    },
    {
      project: "103",
      date: "5/4/2020",
      rating: "56",
      quest:
        "Kemaskini pengguna yang belum menghantar borang permohonan permit.",
      name: "Salim Yaakub",
      status: "unchecked",
      permit: "A574",
      tel: "01112678932",
      report: "Laporan servis aplikasi web tidak respon."
    },
    // {
    //   project: "104",
    //   date: "24/6/2020",
    //   rating: "34",
    //   quest: "",
    //   name: "Tan Cheng Ho",
    //   status: "checked",
    //   permit: "A976",
    //   tel: "0137936473",
    //   report: "Laporan untuk pegawai terlibat kemas kini borang."
    // },
    // {
    //   project: "105",
    //   date: "16/7/2020",
    //   rating: "76",
    //   quest: "",
    //   name: "Rajagopal",
    //   status: "inproses",
    //   permit: "A813",
    //   tel: "01128467363",
    //   report: ""
    // },
    // {
    //   project: "106",
    //   date: "10/3/2020",
    //   rating: "23",
    //   quest: "",
    //   name: "Fairus Zakaria",
    //   status: "unchecked",
    //   permit: "A690",
    //   tel: "0134661089",
    //   report: ""
    // },
    // {
    //   project: "107",
    //   date: "2/6/2020",
    //   rating: "58",
    //   quest: "",
    //   name: "Syazwani Ahmad",
    //   status: "checked",
    //   permit: "A590",
    //   tel: "0184628493",
    //   report: ""
    // },
    // {
    //   project: "108",
    //   date: "5/8/2020",
    //   rating: "35",
    //   quest: "",
    //   name: "Fatin Faris",
    //   status: "inproses",
    //   permit: "A536",
    //   tel: "0102001572",
    //   report: ""
    // },
    // {
    //   project: "109",
    //   date: "3/1/2020",
    //   rating: "50",
    //   quest: "",
    //   name: "Rose John",
    //   status: "unchecked",
    //   permit: "A109",
    //   tel: "0173005728",
    //   report: ""
    // },
  ];
  SelectionType = SelectionType;

  //modal
  modalRef: BsModalRef;

  // Chart
  private chart1: any;
  private chart2: any;
  private chart3: any;

  constructor(
    private zone: NgZone,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {
    this.temp = this.rows.map((prop, key) => {
      return {
        ...prop,
        id: key,
      };
    });
  }

  ngOnInit() {
    this.getCharts();
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart1) {
        console.log("Chart disposed");
        this.chart1.dispose();
      }
      if (this.chart2) {
        console.log("Chart disposed");
        this.chart2.dispose();
      }
      if (this.chart3) {
        console.log("Chart disposed");
        this.chart3.dispose();
      }
    });
  }

  getCharts() {
    this.zone.runOutsideAngular(() => {
      this.getChartCheckPoint1();
      this.getChartCheckPoint2();
      this.getChartCheckPoint3();
    });
  }

  getChartCheckPoint1() {
    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("chartdivcheckpoint1", am4plugins_timeline.SerpentineChart);
    chart.curveContainer.padding(20, 20, 20, 20);
    chart.levelCount = 8;
    chart.orientation = "horizontal";
    chart.fontSize = 11;

    let colorSet = new am4core.ColorSet();
    colorSet.saturation = 0.6;

    chart.data = [
      {
        category: "Module #1",
        start: "2016-01-10",
        end: "2016-01-13",
        color: colorSet.getIndex(0),
        task: "Gathering requirements",
      },
      {
        category: "Module #1",
        start: "2016-02-05",
        end: "2016-04-18",
        color: colorSet.getIndex(0),
        task: "Development",
      },
      {
        category: "Module #2",
        start: "2016-01-08",
        end: "2016-01-10",
        color: colorSet.getIndex(5),
        task: "Gathering requirements",
      },
      {
        category: "Module #2",
        start: "2016-01-12",
        end: "2016-01-15",
        color: colorSet.getIndex(5),
        task: "Producing specifications",
      },
      {
        category: "Module #2",
        start: "2016-01-16",
        end: "2016-02-05",
        color: colorSet.getIndex(5),
        task: "Development",
      },
      {
        category: "Module #2",
        start: "2016-02-10",
        end: "2016-02-18",
        color: colorSet.getIndex(5),
        task: "Testing and QA",
      },
      {
        category: "",
        task: "",
      },
      {
        category: "Module #3",
        start: "2016-01-01",
        end: "2016-01-19",
        color: colorSet.getIndex(9),
        task: "Gathering requirements",
      },
      {
        category: "Module #3",
        start: "2016-02-01",
        end: "2016-02-10",
        color: colorSet.getIndex(9),
        task: "Producing specifications",
      },
      {
        category: "Module #3",
        start: "2016-03-10",
        end: "2016-04-15",
        color: colorSet.getIndex(9),
        task: "Development",
      },
      {
        category: "Module #3",
        start: "2016-04-20",
        end: "2016-04-30",
        color: colorSet.getIndex(9),
        task: "Testing and QA",
      },
      {
        category: "Module #4",
        start: "2016-01-15",
        end: "2016-02-12",
        color: colorSet.getIndex(15),
        task: "Gathering requirements",
      },
      {
        category: "Module #4",
        start: "2016-02-25",
        end: "2016-03-10",
        color: colorSet.getIndex(15),
        task: "Development",
      },
      {
        category: "Module #4",
        start: "2016-03-23",
        end: "2016-04-29",
        color: colorSet.getIndex(15),
        task: "Testing and QA",
      },
    ];

    chart.dateFormatter.dateFormat = "yyyy-MM-dd";
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis() as any);
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.labels.template.paddingRight = 25;
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.renderer.innerRadius = -60;
    categoryAxis.renderer.radius = 60;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis() as any);
    dateAxis.renderer.minGridDistance = 70;
    dateAxis.baseInterval = { count: 1, timeUnit: "day" };

    dateAxis.renderer.tooltipLocation = 0;
    dateAxis.startLocation = -0.5;
    dateAxis.renderer.line.strokeDasharray = "1,4";
    dateAxis.renderer.line.strokeOpacity = 0.7;
    dateAxis.tooltip.background.fillOpacity = 0.2;
    dateAxis.tooltip.background.cornerRadius = 5;
    dateAxis.tooltip.label.fill = new am4core.InterfaceColorSet().getFor(
      "alternativeBackground"
    );
    dateAxis.tooltip.label.paddingTop = 7;

    let labelTemplate = dateAxis.renderer.labels.template;
    labelTemplate.verticalCenter = "middle";
    labelTemplate.fillOpacity = 0.7;
    labelTemplate.background.fill = new am4core.InterfaceColorSet().getFor(
      "background"
    );
    labelTemplate.background.fillOpacity = 1;
    labelTemplate.padding(7, 7, 7, 7);

    let categoryAxisLabelTemplate = categoryAxis.renderer.labels.template;
    categoryAxisLabelTemplate.horizontalCenter = "left";
    categoryAxisLabelTemplate.adapter.add(
      "rotation",
      function (rotation, target) {
        let position = dateAxis.valueToPosition(dateAxis.min);
        return dateAxis.renderer.positionToAngle(position) + 90;
      }
    );

    let series1 = chart.series.push(
      new am4plugins_timeline.CurveColumnSeries()
    );
    series1.columns.template.height = am4core.percent(20);
    series1.columns.template.tooltipText =
      "{task}: [bold]{openDateX}[/] - [bold]{dateX}[/]";

    series1.dataFields.openDateX = "start";
    series1.dataFields.dateX = "end";
    series1.dataFields.categoryY = "category";
    series1.columns.template.propertyFields.fill = "color"; // get color from data
    series1.columns.template.propertyFields.stroke = "color";
    series1.columns.template.strokeOpacity = 0;

    let bullet = new am4charts.CircleBullet();
    series1.bullets.push(bullet);
    bullet.circle.radius = 3;
    bullet.circle.strokeOpacity = 0;
    bullet.propertyFields.fill = "color";
    bullet.locationX = 0;

    let bullet2 = new am4charts.CircleBullet();
    series1.bullets.push(bullet2);
    bullet2.circle.radius = 3;
    bullet2.circle.strokeOpacity = 0;
    bullet2.propertyFields.fill = "color";
    bullet2.locationX = 1;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.align = "center";
    chart.scrollbarX.width = am4core.percent(90);

    let cursor = new am4plugins_timeline.CurveCursor();
    chart.cursor = cursor;
    cursor.xAxis = dateAxis;
    cursor.yAxis = categoryAxis;
    cursor.lineY.disabled = true;
    cursor.lineX.strokeDasharray = "1,4";
    cursor.lineX.strokeOpacity = 1;

    dateAxis.renderer.tooltipLocation2 = 0;
    categoryAxis.cursorTooltipEnabled = false;

    this.chart1 = chart;
  }

  getChartCheckPoint2() {
    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("chartdivcheckpoint2", am4charts.XYChart);
    chart.colors.step = 2;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.paddingBottom = 20;
    chart.legend.labels.template.maxWidth = 95;

    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = "category";
    xAxis.renderer.cellStartLocation = 0.1;
    xAxis.renderer.cellEndLocation = 0.9;
    xAxis.renderer.grid.template.location = 0;

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    function createSeries(value, name) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = value;
      series.dataFields.categoryX = "category";
      series.name = name;

      series.events.on("hidden", arrangeColumns);
      series.events.on("shown", arrangeColumns);

      let bullet = series.bullets.push(new am4charts.LabelBullet());
      bullet.interactionsEnabled = false;
      bullet.dy = 30;
      bullet.label.text = "{valueY}";
      bullet.label.fill = am4core.color("#ffffff");

      return series;
    }

    chart.data = [
      {
        category: "Januari",
        first: 40,
        second: 55,
      },
      {
        category: "Februari",
        first: 30,
        second: 78,
      },
      {
        category: "Mac",
        first: 27,
        second: 40,
      },
      {
        category: "April",
        first: 50,
        second: 63,
      },
      {
        category: "Mei",
        first: 31,
        second: 45,
      },
      {
        category: "Jun",
        first: 51,
        second: 85,
      },
      {
        category: "Julai",
        first: 31,
        second: 69,
      },
      {
        category: "Ogos",
        first: 14,
        second: 14,
      },
      {
        category: "September",
        first: 37,
        second: 69,
      },
      {
        category: "Oktober",
        first: 52,
        second: 78,
      },
      {
        category: "November",
        first: 53,
        second: 97,
      },
      {
        category: "Disember",
        first: 13,
        second: 31,
      },
    ];

    createSeries("first", "Balas");
    createSeries("second", "Makluman");

    function arrangeColumns() {
      let series = chart.series.getIndex(0);

      let w =
        1 -
        xAxis.renderer.cellStartLocation -
        (1 - xAxis.renderer.cellEndLocation);
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
            } else {
              series.dummyData = chart.series.indexOf(series);
            }
          });
          let visibleCount = newIndex;
          let newMiddle = visibleCount / 2;

          chart.series.each(function (series) {
            let trueIndex = chart.series.indexOf(series);
            let newIndex = series.dummyData;

            let dx = (newIndex - trueIndex + middle - newMiddle) * delta;

            series.animate(
              { property: "dx", to: dx },
              series.interpolationDuration,
              series.interpolationEasing
            );
            series.bulletsContainer.animate(
              { property: "dx", to: dx },
              series.interpolationDuration,
              series.interpolationEasing
            );
          });
        }
      }
    }

    this.chart2 = chart;
  }

  getChartCheckPoint3() {
    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("chartdivcheckpoint3", am4charts.XYChart);
    chart.scrollbarX = new am4core.Scrollbar();

    // Add data
    chart.data = [
      {
        country: "Januari",
        visits: 20,
      },
      {
        country: "Februari",
        visits: 12,
      },
      {
        country: "Mac",
        visits: 18,
      },
      {
        country: "April",
        visits: 13,
      },
      {
        country: "Mei",
        visits: 22,
      },
      {
        country: "Jun",
        visits: 11,
      },
      {
        country: "Julai",
        visits: 24,
      },
      {
        country: "Ogos",
        visits: 30,
      },
      {
        country: "September",
        visits: 45,
      },
      {
        country: "Oktober",
        visits: 50,
      },
      {
        country: "November",
        visits: 43,
      },
      {
        country: "Disember",
        visits: 31,
      },
    ];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "visits";
    series.dataFields.categoryX = "country";
    series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
    series.columns.template.strokeWidth = 0;

    series.tooltip.pointerOrientation = "vertical";

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

    // on hover, make corner radiuses bigger
    let hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    // Cursor
    chart.cursor = new am4charts.XYCursor();

    this.chart3 = chart;
  }

  entriesChange($event) {
    this.entries = $event.target.date;
  }
  filterTable($event) {
    let val = $event.target.date;
    this.temp = this.rows.filter(function (d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  successSwal(task) {
    swal.fire({
      title: "Berjaya",
      text: "Berjaya " + task + "!",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
    });
    this.modalRef.hide();
  }

  delete() {
    swal
      .fire({
        title: "Confirmation",
        text: "Are you sure want to delete this data?",
        type: "info",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-info",
        confirmButtonText: "Confirm",
        showCancelButton: true,
        cancelButtonClass: "btn btn-danger",
        cancelButtonText: "Cancel",
      })
      .then((result) => {
        if (result.value) {
          this.doneDelete();
        }
      });
  }

  doneDelete() {
    swal.fire({
      title: "Success",
      text: "The data has been deleted!",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
      confirmButtonText: "Close",
    });
  }

  successSwallStepper() {
    swal
      .fire({
        title: "Confirmation",
        text: "Are you sure want to submit this data?",
        type: "info",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-info",
        confirmButtonText: "Confirm",
        showCancelButton: true,
        cancelButtonClass: "btn btn-danger",
        cancelButtonText: "Cancel",
      })
      .then((result) => {
        if (result.value) {
          this.donesuccessSwallStepper();
        }
      });
  }

  donesuccessSwallStepper() {
    swal.fire({
      title: "Success",
      text: "The data has been submitted!",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
      confirmButtonText: "Close",
    });
    this.modalRef.hide();
  }
}
