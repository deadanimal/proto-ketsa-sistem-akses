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

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-semak-pengurusan-pembayaran",
  templateUrl: "./semak-pengurusan-pembayaran.component.html",
  styleUrls: ["./semak-pengurusan-pembayaran.component.scss"],
})
export class SemakPengurusanPembayaranComponent implements OnInit, OnDestroy {
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
    },
    {
      project: "104",
      date: "24/6/2020",
      rating: "34",
      quest: "",
      name: "Tan Cheng Ho",
      status: "checked",
      permit: "A976",
      tel: "0137936473",
    },
    {
      project: "105",
      date: "16/7/2020",
      rating: "76",
      quest: "",
      name: "Rajagopal",
      status: "inproses",
      permit: "A813",
      tel: "01128467363",
    },
    {
      project: "106",
      date: "10/3/2020",
      rating: "23",
      quest: "",
      name: "Fairus Zakaria",
      status: "unchecked",
      permit: "A690",
      tel: "0134661089",
    },
    {
      project: "107",
      date: "2/6/2020",
      rating: "58",
      quest: "",
      name: "Syazwani Ahmad",
      status: "checked",
      permit: "A590",
      tel: "0184628493",
    },
    {
      project: "108",
      date: "5/8/2020",
      rating: "35",
      quest: "",
      name: "Fatin Faris",
      status: "inproses",
      permit: "A536",
      tel: "0102001572",
    },
    {
      project: "109",
      date: "3/1/2020",
      rating: "50",
      quest: "",
      name: "Rose John",
      status: "unchecked",
      permit: "A109",
      tel: "0173005728",
    },
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
      this.getChartCheckPaymentApp1();
      this.getChartCheckPaymentApp2();
    });
  }

  getChartCheckPaymentApp1() {
    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let container = am4core.create("chartdivcheckpayment1", am4core.Container);
    container.width = am4core.percent(100);
    container.height = am4core.percent(100);
    container.layout = "horizontal";

    let chart = container.createChild(am4charts.PieChart);

    // Add data
    chart.data = [
      {
        country: "2020",
        litres: 300,
        subData: [
          { name: "Sudah Dibayar", value: 159 },
          { name: "Dalam Proses", value: 103 },
          { name: "Belum Dibayar", value: 38 },
        ],
      },
      {
        country: "2019",
        litres: 417,
        subData: [
          { name: "Sudah Dibayar", value: 228 },
          { name: "Dalam Proses", value: 141 },
          { name: "Belum Dibayar", value: 48 },
        ],
      },
      {
        country: "2018",
        litres: 346,
        subData: [
          { name: "Sudah Dibayar", value: 215 },
          { name: "Dalam Proses", value: 78 },
          { name: "Belum Dibayar", value: 53 },
        ],
      },
      {
        country: "2017",
        litres: 523,
        subData: [
          { name: "Sudah Dibayar", value: 510 },
          { name: "Dalam Proses", value: 12 },
          { name: "Belum Dibayar", value: 1 },
        ],
      },
    ];

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
    pieSeries.slices.template.states.getKey(
      "active"
    ).properties.shiftRadius = 0;
    //pieSeries.labels.template.text = "{category}\n{value.percent.formatNumber('#.#')}%";

    pieSeries.slices.template.events.on("hit", function (event) {
      selectSlice(event.target.dataItem);
    });

    let chart2 = container.createChild(am4charts.PieChart);
    chart2.width = am4core.percent(30);
    chart2.radius = am4core.percent(80);

    // Add and configure Series
    let pieSeries2 = chart2.series.push(new am4charts.PieSeries());
    pieSeries2.dataFields.value = "value";
    pieSeries2.dataFields.category = "name";
    pieSeries2.slices.template.states.getKey(
      "active"
    ).properties.shiftRadius = 0;
    //pieSeries2.labels.template.radius = am4core.percent(50);
    //pieSeries2.labels.template.inside = true;
    //pieSeries2.labels.template.fill = am4core.color("#ffffff");
    pieSeries2.labels.template.disabled = true;
    pieSeries2.ticks.template.disabled = true;
    pieSeries2.alignLabels = false;
    pieSeries2.events.on("positionchanged", updateLines);

    let interfaceColors = new am4core.InterfaceColorSet();

    let line1 = container.createChild(am4core.Line);
    line1.strokeDasharray = "2,2";
    line1.strokeOpacity = 0.5;
    line1.stroke = interfaceColors.getFor("alternativeBackground");
    line1.isMeasured = false;

    let line2 = container.createChild(am4core.Line);
    line2.strokeDasharray = "2,2";
    line2.strokeOpacity = 0.5;
    line2.stroke = interfaceColors.getFor("alternativeBackground");
    line2.isMeasured = false;

    let selectedSlice;

    function selectSlice(dataItem) {
      selectedSlice = dataItem.slice;

      let fill = selectedSlice.fill;

      let count = dataItem.dataContext.subData.length;
      pieSeries2.colors.list = [];
      for (var i = 0; i < count; i++) {
        pieSeries2.colors.list.push(fill.brighten((i * 2) / count));
      }

      chart2.data = dataItem.dataContext.subData;
      pieSeries2.appear();

      let middleAngle = selectedSlice.middleAngle;
      let firstAngle = pieSeries.slices.getIndex(0).startAngle;
      let animation = pieSeries.animate(
        [
          { property: "startAngle", to: firstAngle - middleAngle },
          { property: "endAngle", to: firstAngle - middleAngle + 360 },
        ],
        600,
        am4core.ease.sinOut
      );
      animation.events.on("animationprogress", updateLines);

      selectedSlice.events.on("transformed", updateLines);

      //  var animation = chart2.animate({property:"dx", from:-container.pixelWidth / 2, to:0}, 2000, am4core.ease.elasticOut)
      //  animation.events.on("animationprogress", updateLines)
    }

    function updateLines() {
      if (selectedSlice) {
        let p11 = {
          x: selectedSlice.radius * am4core.math.cos(selectedSlice.startAngle),
          y: selectedSlice.radius * am4core.math.sin(selectedSlice.startAngle),
        };
        let p12 = {
          x:
            selectedSlice.radius *
            am4core.math.cos(selectedSlice.startAngle + selectedSlice.arc),
          y:
            selectedSlice.radius *
            am4core.math.sin(selectedSlice.startAngle + selectedSlice.arc),
        };

        p11 = am4core.utils.spritePointToSvg(p11, selectedSlice);
        p12 = am4core.utils.spritePointToSvg(p12, selectedSlice);

        let p21 = { x: 0, y: -pieSeries2.pixelRadius };
        let p22 = { x: 0, y: pieSeries2.pixelRadius };

        p21 = am4core.utils.spritePointToSvg(p21, pieSeries2);
        p22 = am4core.utils.spritePointToSvg(p22, pieSeries2);

        line1.x1 = p11.x;
        line1.x2 = p21.x;
        line1.y1 = p11.y;
        line1.y2 = p21.y;

        line2.x1 = p12.x;
        line2.x2 = p22.x;
        line2.y1 = p12.y;
        line2.y2 = p22.y;
      }
    }

    chart.events.on("datavalidated", function () {
      setTimeout(function () {
        selectSlice(pieSeries.dataItems.getIndex(0));
      }, 1000);
    });

    this.chart1 = container;
  }

  getChartCheckPaymentApp2() {
    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("chartdivcheckpayment2", am4charts.XYChart);

    chart.data = [
      {
        country: "Januari",
        visits: 2025,
      },
      {
        country: "Februari",
        visits: 1882,
      },
      {
        country: "Mac",
        visits: 1809,
      },
      {
        country: "April",
        visits: 1322,
      },
      {
        country: "Mei",
        visits: 1122,
      },
      {
        country: "June",
        visits: 1114,
      },
      {
        country: "Julai",
        visits: 984,
      },
      {
        country: "Ogos",
        visits: 711,
      },
      {
        country: "September",
        visits: 665,
      },
      {
        country: "Oktober",
        visits: 580,
      },
      {
        country: "November",
        visits: 443,
      },
      {
        country: "Disember",
        visits: 441,
      },
    ];

    chart.padding(40, 40, 40, 40);

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.extraMax = 0.1;
    //valueAxis.rangeChangeEasing = am4core.ease.linear;
    //valueAxis.rangeChangeDuration = 1500;

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = "country";
    series.dataFields.valueY = "visits";
    series.tooltipText = "{valueY.value}";
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.cornerRadiusTopLeft = 10;
    //series.interpolationDuration = 1500;
    //series.interpolationEasing = am4core.ease.linear;
    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.verticalCenter = "bottom";
    labelBullet.label.dy = -10;
    labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";

    chart.zoomOutButton.disabled = true;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    setInterval(function () {
      am4core.array.each(chart.data, function (item) {
        item.visits += Math.round(Math.random() * 200 - 100);
        item.visits = Math.abs(item.visits);
      });
      chart.invalidateRawData();
    }, 2000);

    categoryAxis.sortBySeries = series;

    this.chart2 = chart;
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
      title: "Success",
      text: "Successfully " + task + "!",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
    });
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
