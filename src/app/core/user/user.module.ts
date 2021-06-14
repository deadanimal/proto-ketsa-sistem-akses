import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  AccordionModule,
  BsDropdownModule,
  ModalModule,
  ProgressbarModule,
  TabsModule,
  TooltipModule,
} from "ngx-bootstrap";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { LoadingBarModule } from "@ngx-loading-bar/core";
import { LivechatWidgetModule } from "@livechat/angular-widget";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { RatingModule } from "ngx-bootstrap/rating";
// import {RatingModule} from "ngx-rating";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { MatStepperModule } from "@angular/material/stepper"; 
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as mapbox from 'mapbox-gl';
(mapbox as any).accessToken = environment.mapbox.accessToken

import { RouterModule } from "@angular/router";
import { UserRoutes } from "./user.routing";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PermohonanPermitComponent } from "./permohonan-permit/permohonan-permit.component";
import { KelulusanPermitComponent } from "./kelulusan-permit/kelulusan-permit.component";
import { MaklumBalasComponent } from "./maklum-balas/maklum-balas.component";
import { LaporanComponent } from "./laporan/laporan.component";
import { TetapanComponent } from "./tetapan/tetapan.component";
import { PengurusanPenggunaComponent } from "./pengurusan-pengguna/pengurusan-pengguna.component";
import { QnaComponent } from "./qna/qna.component";
import { PengurusanPembayaranComponent } from "./pengurusan-pembayaran/pengurusan-pembayaran.component";
import { PemohonBersamaComponent } from "./pemohon-bersama/pemohon-bersama.component";

@NgModule({
  declarations: [
    DashboardComponent,
    PermohonanPermitComponent,
    KelulusanPermitComponent,
    MaklumBalasComponent,
    LaporanComponent,
    TetapanComponent,
    PengurusanPenggunaComponent,
    QnaComponent,
    PengurusanPembayaranComponent,
    PemohonBersamaComponent,
  ],
  imports: [
    CommonModule,
    AccordionModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    LoadingBarModule,
    NgxDatatableModule,
    RouterModule.forChild(UserRoutes),
    LivechatWidgetModule,
    CarouselModule.forRoot(),
    RatingModule.forRoot(),
    // RatingModule,
    LeafletModule,
    MatStepperModule,
    CdkStepperModule,
    HttpClientModule,
  ],
})
export class UserModule {}
