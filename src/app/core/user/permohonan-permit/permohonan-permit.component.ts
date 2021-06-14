import {
  Component,
  OnInit,
  NgZone,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter
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
import { tileLayer, latLng, marker, icon } from "leaflet";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MapService } from "src/app/shared/services/map/map.service";
import { Map, NavigationControl } from "mapbox-gl";
import * as L from 'leaflet';

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}
@Component({
  selector: "app-permohonan-permit",
  templateUrl: "./permohonan-permit.component.html",
  styleUrls: ["./permohonan-permit.component.scss"],
})
export class PermohonanPermitComponent
  implements OnInit, OnDestroy, AfterViewInit
{
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
      report: "Laporan untuk pegawai terlibat kemas kini borang."
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
      report: ""
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
      report: ""
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
      report: ""
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
      report: ""
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
      report: ""
    },
  ];
  SelectionType = SelectionType;

  //map
  options1 = {
    layers1: [
      tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "...",
      }),
    ],
    zoom: 8,
    center: latLng(3.4582308051504707, 101.5892640625),
  };
  // layers1 = [
  //   marker([3.4582308051504707, 101.5892640625], {
  //     icon: icon({
  //       iconSize: [25, 41],
  //       iconAnchor: [13, 41],
  //       iconUrl: "../assets/img/default/pinpoint-red.png",
  //     }),
  //   }),
  //   marker([3.140853, 101.693207], {
  //     icon: icon({
  //       iconSize: [25, 41],
  //       iconAnchor: [13, 41],
  //       iconUrl: "../assets/img/default/pinpoint-blue.png",
  //     }),
  //   }),
  //   marker([2.691369, 101.750527], {
  //     icon: icon({
  //       iconSize: [25, 41],
  //       iconAnchor: [13, 41],
  //       iconUrl: "../assets/img/default/pinpoint-yellow.png",
  //     }),
  //   }),
  // ];

  public map1: L.Map = null;
  private latoLong: L.LatLngTuple = [3.4582308051504707, 101.58926406250]; // for set st

  // Define our base layers so we can reference them multiple times
  streetMaps = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Set the initial set of displayed layers (we could also use the leafletLayers input binding for this)
  options = {
    layers: [this.streetMaps],
    zoom: 17,
    center: L.latLng(this.latoLong)
  };

  @Output() outputLatLong = new EventEmitter<L.LatLngTuple>();

  //form
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  //modal
  modalRef: BsModalRef;
  modalRef1: BsModalRef;

  // Chart
  private chart1: any;
  private chart2: any;
  private chart3: any;

  @ViewChild("mapEl", { static: true })
  mapEl: ElementRef<HTMLDivElement>;

  private map: Map;

  constructor(
    private zone: NgZone,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    private mapSrv: MapService
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
    });
  }

  ngAfterViewInit(): void {
    // this.map = new Map({
    //   container: this.mapEl.nativeElement,
    //   style: "mapbox://styles/mapbox/dark-v9",
    //   center: { lng: -102.380979, lat: 35.877742 },
    //   zoom: 4,
    //   pitch: 20,
    //   attributionControl: true,
    // });
    // this.map.addControl(
    //   new NavigationControl({
    //     showZoom: true,
    //     showCompass: true,
    //     visualizePitch: true,
    //   }),
    //   "top-right"
    // );
    // this.mapSrv.map.next(this.map);

    // this.map.on("load", () => {
    //   console.log("map loaded");
    //   this.mapSrv.map.complete();
    // });
  }

  getChartCheckPoint1() {
    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create(
      "chartdivuserapplicantionpermit1",
      am4charts.XYChart3D
    );
    chart.paddingBottom = 30;
    chart.angle = 35;

    // Add data
    chart.data = [
      {
        country: "Jan",
        visits: 4025,
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

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.inside = true;
    categoryAxis.renderer.grid.template.disabled = true;

    let labelTemplate = categoryAxis.renderer.labels.template;
    labelTemplate.rotation = -90;
    labelTemplate.horizontalCenter = "left";
    labelTemplate.verticalCenter = "middle";
    labelTemplate.dy = 10; // moves it a bit down;
    labelTemplate.inside = false; // this is done to avoid settings which are not suitable when label is rotated

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.disabled = true;

    // Create series
    let series = chart.series.push(new am4charts.ConeSeries());
    series.dataFields.valueY = "visits";
    series.dataFields.categoryX = "country";

    let columnTemplate = series.columns.template;
    columnTemplate.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    columnTemplate.adapter.add("stroke", function (stroke, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

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
    this.modalRef = this.modalService.show(template, { class: "modal-xl" });
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ["", Validators.required],
    });
  }

  openModal1(template: TemplateRef<any>) {
    this.modalRef1 = this.modalService.show(template);
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
        title: "Pengesahan",
        text: "Anda mahu simpan amaklumat ini?",
        type: "info",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-info",
        confirmButtonText: "Sahkan",
        showCancelButton: true,
        cancelButtonClass: "btn btn-danger",
        cancelButtonText: "Batal",
      })
      .then((result) => {
        if (result.value) {
          this.donesuccessSwallStepper();
        }
      });
  }

  donesuccessSwallStepper() {
    swal.fire({
      title: "Berjaya",
      text: "Maklumat telah disimpan!",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
      confirmButtonText: "Tutup",
    });
    this.modalRef.hide();
  }

  refreshMap() {
    if (this.map) {
      // this.streetMaps.redraw();
      this.map1.invalidateSize();
    }
  }

  onMapReady(map1: L.Map) {
    map1.on('click', (eventMouse: L.LeafletMouseEvent) => {
      this.latoLong = [eventMouse.latlng.lat, eventMouse.latlng.lng];
      map1.setView(this.latoLong, map1.getZoom());
      this.outputLatLong.emit(this.latoLong);
    });
    this.map1 = map1;
  }
}
