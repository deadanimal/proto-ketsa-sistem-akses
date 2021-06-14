import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  AccordionModule,
  BsDropdownModule,
  ModalModule,
  ProgressbarModule, 
  TabsModule,
  TooltipModule
} from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { RouterModule } from '@angular/router';
import { AdminRoutes } from './admin.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagementAuditComponent } from './management-audit/management-audit.component';
import { ManagementUserComponent } from './management-user/management-user.component';
import { ReportComponent } from './report/report.component';
import { PermohonanPermitComponent } from './permohonan-permit/permohonan-permit.component';
import { CheckpointComponent } from './checkpoint/checkpoint.component';
import { MaklumBalasComponent } from './maklum-balas/maklum-balas.component';
import { SenaraiFaqComponent } from './senarai-faq/senarai-faq.component';
import { SemakPermohonanComponent } from './semak-permohonan/semak-permohonan.component';
import { SemakPengurusanPembayaranComponent } from './semak-pengurusan-pembayaran/semak-pengurusan-pembayaran.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ManagementAuditComponent,
    ManagementUserComponent,
    ReportComponent,
    PermohonanPermitComponent,
    CheckpointComponent,
    MaklumBalasComponent,
    SenaraiFaqComponent,
    SemakPermohonanComponent,
    SemakPengurusanPembayaranComponent,
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
    RouterModule.forChild(AdminRoutes)
  ]
})
export class AdminModule { }
