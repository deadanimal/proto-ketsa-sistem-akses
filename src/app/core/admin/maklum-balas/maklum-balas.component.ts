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
  selector: "app-maklum-balas",
  templateUrl: "./maklum-balas.component.html",
  styleUrls: ["./maklum-balas.component.scss"],
})
export class MaklumBalasComponent implements OnInit {
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
    },
    {
      project: "102",
      date: "8/5/2020",
      rating: "79",
      quest: "Kemas kini berita yang lebih terkini dan padat.",
      name: "Hasnah Ali",
      status: "inproses",
    },
    {
      project: "103",
      date: "5/4/2020",
      rating: "56",
      quest: "Kemaskini pengguna yang belum menghantar borang permohonan permit.",
      name: "Salim Yaakub",
      status: "unchecked",
    },
    // {
    //   project: "104",
    //   date: "24/6/2020",
    //   rating: "34",
    //   quest: "",
    //   name: "",
    //   status: "",
    // },
    // {
    //   project: "105",
    //   date: "16/7/2020",
    //   rating: "76",
    //   quest: "",
    //   name: "",
    //   status: "",
    // },
    // {
    //   project: "106",
    //   date: "10/3/2020",
    //   rating: "23",
    //   quest: "",
    //   name: "",
    //   status: "",
    // },
    // {
    //   project: "107",
    //   date: "2/6/2020",
    //   rating: "58",
    //   quest: "",
    //   name: "",
    //   status: "",
    // },
    // {
    //   project: "108",
    //   date: "5/8/2020",
    //   rating: "35",
    //   quest: "",
    //   name: "",
    //   status: "",
    // },
    // {
    //   project: "109",
    //   date: "3/1/2020",
    //   rating: "50",
    //   quest: "",
    //   name: "",
    //   status: "",
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
    private toastr: ToastrService,
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
      this.getChartFeedback1();
    });
  }

  getChartFeedback1() {
    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("chartdivfeedback1", am4charts.XYChart);
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

    this.chart1 = chart;
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
    this.modalRef = this.modalService.show(template, { class: "modal-lg" });
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
