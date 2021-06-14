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

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-pemohon-bersama",
  templateUrl: "./pemohon-bersama.component.html",
  styleUrls: ["./pemohon-bersama.component.scss"],
})
export class PemohonBersamaComponent implements OnInit {
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
      report: "Laporan pembayaran tidak diterima.",
      location: "Damansara Perdana, Petaling"
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
      report: "Laporan untuk pegawai terlibat kemas kini borang.",
      location: "Bukit Jalil, Kuala Lumpur"
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
      report: "Laporan servis aplikasi web tidak respon.",
      location: "Bangi, Hulu Langat"
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
      this.getChartUserCoApplicant1();
    });
  }

  getChartUserCoApplicant1() {
    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("chartdivusercoapplicant1", am4charts.XYChart);

    chart.data = [
      {
        country: "Jan",
        visits: 2025,
      },
      {
        country: "Feb",
        visits: 1882,
      },
      {
        country: "Mac",
        visits: 1809,
      },
      {
        country: "Apr",
        visits: 1322,
      },
      {
        country: "Mei",
        visits: 1122,
      },
      {
        country: "Jun",
        visits: 1114,
      },
      {
        country: "Jul",
        visits: 984,
      },
      {
        country: "Ogos",
        visits: 711,
      },
      {
        country: "Sep",
        visits: 665,
      },
      {
        country: "Okt",
        visits: 580,
      },
      {
        country: "Nov",
        visits: 443,
      },
      {
        country: "Dis",
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
