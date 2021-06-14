import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PermohonanPermitComponent } from './permohonan-permit/permohonan-permit.component';
import { KelulusanPermitComponent } from './kelulusan-permit/kelulusan-permit.component';
import { MaklumBalasComponent } from './maklum-balas/maklum-balas.component';
import { LaporanComponent } from './laporan/laporan.component';
import { TetapanComponent } from './tetapan/tetapan.component';
import { PengurusanPenggunaComponent } from './pengurusan-pengguna/pengurusan-pengguna.component';
import { QnaComponent } from './qna/qna.component';
import { PengurusanPembayaranComponent } from './pengurusan-pembayaran/pengurusan-pembayaran.component';
import { PemohonBersamaComponent } from './pemohon-bersama/pemohon-bersama.component';

export const UserRoutes: Routes = [
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
                        component: PermohonanPermitComponent
                    },
                    {
                        path: 'co-applicant',
                        component: PemohonBersamaComponent
                    }
                ]
            },
            {
                path: 'approval',
                component: KelulusanPermitComponent
            },
            {
                path: 'feedback',
                component: MaklumBalasComponent
            },
            {
                path: 'report',
                component: LaporanComponent
            },
            {
                path: 'setting',
                component: TetapanComponent
            },
            {
                path: 'user-management',
                component: PengurusanPenggunaComponent
            },
            {
                path: 'qna',
                component: QnaComponent
            },

        ]
    }
]