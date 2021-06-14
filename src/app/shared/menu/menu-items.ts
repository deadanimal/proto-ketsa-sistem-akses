export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    isCollapsed?: boolean;
    isCollapsing?: any;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    type?: string;
    collapse?: string;
    children?: ChildrenItems2[];
    isCollapsed?: boolean;
}
export interface ChildrenItems2 {
    path?: string;
    title?: string;
    type?: string;
}

// Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: '/admin/dashboard',
    title: 'Laman Utama',
    type: 'link',
    icontype: 'fas fa-home text-dark'
  },
  {
    path: '/admin/application',
    title: 'Permohonan Permit',
    type: 'sub',
    icontype: 'fas fa-file-signature text-dark',
    collapse: 'application',
    isCollapsed: true,
    children: [
      { path: 'check-application', title: 'Semakan Permohonan', type: 'link' },
      { path: 'check-payment', title: 'Semak Pengurusan Pembayaran', type: 'link' }
    ]
  },
  {
    path: '/admin/checkpoint',
    title: 'Pemeriksaan Pusat',
    type: 'link',
    icontype: 'fas fa-map-pin text-dark'
  },
  {
    path: '/admin/feedback',
    title: 'Maklum Balas',
    type: 'link',
    icontype: 'fab fa-rocketchat text-dark'
  },
  {
    path: '/admin/faq',
    title: 'Senarai Soalan Lazim',
    type: 'link',
    icontype: 'fas fa-question-circle text-dark'
  },
  {
    path: '/admin/user-management',
    title: 'Pengurusan Pengguna',
    type: 'link',
    icontype: 'fas fa-users-cog text-dark'
  },
  {
    path: '/admin/audit-trails',
    title: 'Jejak Audit',
    type: 'link',
    icontype: 'fas fa-road text-dark'
  },
  {
    path: '/admin/report',
    title: 'Laporan',
    type: 'link',
    icontype: 'fas fa-chart-bar text-dark'
  },
  // {
  //   path: '/admin/management',
  //   title: 'Pengurusan',
  //   type: 'sub',
  //   icontype: 'fas fa-file-invoice text-dark',
  //   collapse: 'management',
  //   isCollapsed: true,
  //   children: [
  //     { path: 'audit-trails', title: 'Audit Trails', type: 'link' },
  //     { path: 'user', title: 'User', type: 'link' }
  //   ]
  // },
  // {
  //   path: '/admin/report',
  //   title: 'Reporting',
  //   type: 'link',
  //   icontype: 'fas fa-chart-bar text-dark'
  // },
  /*
  {
    path: '/helpdesk',
    title: 'Helpdesk',
    type: 'link',
    icontype: 'fas fa-life-ring text-blue'
  },
  {
    path: '/audit',
    title: 'Audit Trail',
    type: 'link',
    icontype: 'fas fa-braille text-indigo'
  }
  */
];

export const ROUTESUSER: RouteInfo[] = [
  {
    path: '/user/dashboard',
    title: 'Laman Utama',
    type: 'link',
    icontype: 'fas fa-home text-dark'
  },
  {
    path: '/user/application',
    title: 'Permohonan',
    type: 'sub',
    icontype: 'fas fa-file-signature text-dark',
    collapse: 'application',
    isCollapsed: true,
    children: [
      { path: 'check-application', title: 'Permit', type: 'link' },
      { path: 'co-applicant', title: 'Permit Pemohon Bersama', type: 'link' }
    ]
  },
  {
    path: '/user/approval',
    title: 'Kelulusan Permit',
    type: 'link',
    icontype: 'fas fa-file-import text-dark'
  },
  {
    path: '/user/feedback',
    title: 'Maklum Balas',
    type: 'link',
    icontype: 'fab fa-rocketchat text-dark'
  },
  // {
  //   path: '/user/report',
  //   title: 'Laporan',
  //   type: 'link',
  //   icontype: 'fas fa-chart-bar text-dark'
  // },
  {
    path: '/user/setting',
    title: 'Tetapan',
    type: 'link',
    icontype: 'fas fa-cogs text-dark'
  },
  {
    path: '/user/user-management',
    title: 'Pengurusan Pengguna ',
    type: 'link',
    icontype: 'fas fa-users-cog text-dark'
  },
  {
    path: '/user/qna',
    title: 'Soalan Lazim',
    type: 'link',
    icontype: 'fas fa-question-circle text-dark'
  },

  // {
  //   path: '/applications',
  //   title: 'Applications',
  //   type: 'link',
  //   icontype: 'fas fa-file-invoice text-pink'
  // },
  // {
  //   path: '/houses',
  //   title: 'Houses',
  //   type: 'link',
  //   icontype: 'fas fa-home text-purple'
  // },
  // {
  //   path: '/management',
  //   title: 'Management',
  //   type: 'link',
  //   icontype: 'fas fa-tasks text-red'
  // },
  // {
  //   path: '/report',
  //   title: 'Report',
  //   type: 'link',
  //   icontype: 'fas fa-chart-bar text-green'
  // },
  // {
  //   path: '/helpdesk',
  //   title: 'Helpdesk',
  //   type: 'link',
  //   icontype: 'fas fa-life-ring text-blue'
  // },
  // {
  //   path: '/audit',
  //   title: 'Audit Trail',
  //   type: 'link',
  //   icontype: 'fas fa-braille text-indigo'
  // }
  /*,
  {
    path: '/maintenance',
    title: 'Maintenance',
    type: 'link',
    icontype: 'fas fa-cogs text-orange'
  }*/
  /*{
    path: '/settings',
    title: 'Settings',
    type: 'link',
    icontype: 'fas fa-sliders-h text-blue'
  }*/
];