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
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-pengurusan-pengguna",
  templateUrl: "./pengurusan-pengguna.component.html",
  styleUrls: ["./pengurusan-pengguna.component.scss"],
})
export class PengurusanPenggunaComponent implements OnInit {
  // Toggle
  editEnabled: boolean = false;

  // Form
  editForm: FormGroup;
  editFormMessages = {
    name: [{ type: "required", message: "Nama diperlukan" }],
    noic: [{ type: "required", message: "No. IC diperlukan" }],
    notel: [{ type: "required", message: "No. Tel diperlukan" }],
    bidang: [{ type: "required", message: "Kelulusan Bidang diperlukan" }],
    address: [{ type: "required", message: "Alamat diperlukan" }],
    city: [{ type: "required", message: "Bandar diperlukan" }],
    country: [{ type: "required", message: "Negara diperlukan" }],
    postcode: [{ type: "required", message: "Poskod diperlukan" }],
    // email: [
    //   { type: "required", message: "Email is required" },
    //   { type: "email", message: "A valid email is required" },
    // ],
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      name: new FormControl("", Validators.compose([Validators.required])),
      noic: new FormControl("", Validators.compose([Validators.required])),
      notel: new FormControl("", Validators.compose([Validators.required])),
      bidang: new FormControl("", Validators.compose([Validators.required])),
      address: new FormControl("", Validators.compose([Validators.required])),
      city: new FormControl("", Validators.compose([Validators.required])),
      country: new FormControl("", Validators.compose([Validators.required])),
      postcodes: new FormControl("", Validators.compose([Validators.required])),
      // email: new FormControl(
      //   "",
      //   Validators.compose([Validators.required, Validators.email])
      // ),
    });
  }

  toggleEdit() {
    this.editEnabled = !this.editEnabled;
  }

  confirm() {
    swal
      .fire({
        title: "Confirmation",
        text: "Are you sure to save this edit?",
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
          this.edit();
        }
      });
  }

  edit() {
    swal
      .fire({
        title: "Success",
        text: "Update has been saved",
        type: "success",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        confirmButtonText: "Close",
      })
      .then((result) => {
        if (result.value) {
          this.editForm.reset();
        }
      });
  }
}
