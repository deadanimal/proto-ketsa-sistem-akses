import { Routes } from '@angular/router';
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

export const AdminRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'application',
                children: [
                    {
                        path: 'check-application',
                        component: SemakPermohonanComponent
                    },
                    {
                        path: 'check-payment',
                        component: SemakPengurusanPembayaranComponent
                    }
                ]
            },
            {
                path: 'checkpoint',
                component: CheckpointComponent
            },
            {
                path: 'feedback',
                component: MaklumBalasComponent
            },
            {
                path: 'faq',
                component: SenaraiFaqComponent
            },
            {
                path: 'user-management',
                component: ManagementUserComponent
            },
            {
                path: 'audit-trails',
                component: ManagementAuditComponent
            },
            {
                path: 'report',
                component: ReportComponent
            },
            // {
            //     path: 'management',
            //     children: [
            //         {
            //             path: 'audit-trails',
            //             component: ManagementAuditComponent
            //         },
            //         {
            //             path: 'user',
            //             component: ManagementUserComponent
            //         }
            //     ]
            // },
            // {
            //     path: 'report',
            //     component: ReportComponent
            // }
        ]
    }
]