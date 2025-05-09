import { all_routes } from "../../../feature-module/router/all_routes";
const routes = all_routes;

export const SidebarData = [
  {
    label: "Dashboard",
    submenuOpen: true,
    submenuHdr: "Dashboard",
    submenu: false,
    showSubRoute: false,
    submenuItems: [
      {
        label: "Dashboard",
        link: routes.adminDashboard,
        icon: "ion-cube",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Grammar Practice",
        link: routes.grammerPractice,
        icon: "ion-clipboard",
        showSubRoute: false,
        submenu: false,
      },
      // {
      //   label: "Study Plan",
      //   link: routes.studyPlan,
      //   icon: "ion-calendar",
      //   showSubRoute: false,
      //   submenu: false,
      // },
      {
        label: "My Performance",
        link: routes.performance,
        icon: "ion-leaf",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "PTE Test Format",
        link: routes.ptetestcard,
        icon: "ion-document-text",
        showSubRoute: false,
        submenu: false,
      },
    ],
  },
  {
    label: "Mocktest",
    submenuOpen: true,
    submenuHdr: "Mocktest",
    submenu: false,
    showSubRoute: false,
    submenuItems: [
      {
        label: "Full Mocktest",
        link: routes.fullMocktest,
        icon: "ion-monitor",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Sectional Mocktest",
        link: routes.sectionalMocktest,
        icon: "fa fa-book",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Mocktest Results",
        link: routes.mockTestResult,
        icon: "ion-clipboard",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Pending Mocktest",
        link: routes.pendingMocktest,
        icon: "ion-alert",
        showSubRoute: false,
        submenu: false,
      },
    ],
  },
  // {
  //   label: "Study Tools",
  //   submenuOpen: true,
  //   submenuHdr: "Study Tools",
  //   submenu: false,
  //   showSubRoute: false,
  //   submenuItems: [
  //     {
  //       label: "class Recording",

  //       icon: "ion-videocamera",
  //       showSubRoute: false,
  //       submenu: false,
  //     },
  //     {
  //       label: "Template",

  //       icon: "ion-laptop",
  //       showSubRoute: false,
  //       submenu: false,
  //     },
  //     {
  //       label: "Grammar",

  //       icon: "ti ti-clipboard-data",
  //       showSubRoute: false,
  //       submenu: false,
  //     },
  //     {
  //       label: "Prediction File",

  //       icon: "ion-folder",
  //       showSubRoute: false,
  //       submenu: false,
  //     },
  //     {
  //       label: "Class Link",

  //       icon: "ion-link",
  //       showSubRoute: false,
  //       submenu: false,
  //     },
  //     {
  //       label: "Timetable",
  //       icon: "ion-calendar",
  //       showSubRoute: false,
  //       submenu: false,
  //     },
  //   ],
  // },
];
