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
import { CarouselConfig } from "ngx-bootstrap/carousel";
import {Rating} from "ngx-rating";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { importExpr } from "@angular/compiler/src/output/output_ast";

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
  providers: [
    {
      provide: CarouselConfig,
      useValue: { interval: 1500, noPause: true, showIndicators: true },
    },
    Rating
  ],
  
})
export class MaklumBalasComponent implements OnInit {
  max = 10;
  rate = 0;
  isReadonly = false;

  starsCount: number;

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
      quest:
        "Kemaskini pengguna yang belum menghantar borang permohonan permit.",
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
      // this.getChartFeedback1();
    });
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

  confirmSelection(event: KeyboardEvent) {
    if (event.keyCode === 13 || event.key === 'Enter') {
      this.isReadonly = true;
    }
  }
 
  resetStars() {
    this.rate = 0;
    this.isReadonly = false;
  }
}
