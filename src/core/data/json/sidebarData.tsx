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
        label: "Grammer Practice",
        link: routes.events,
        icon: "ion-clipboard",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Study Plan",
        link: routes.events,
        icon: "ion-calendar",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "My Performance",
        link: routes.events,
        icon: "ion-leaf",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "PTE Test Format",
        link: routes.events,
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
        // link: routes.adminDashboard,
        icon: "ion-monitor",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Sectional Mocktest",
        // link: routes.adminDashboard,
        icon: "fa fa-book",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Mocktest Results",
        // link: routes.adminDashboard,
        icon: "ion-clipboard",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Pending Mocktest",
        // link: routes.adminDashboard,
        icon: "ion-alert",
        showSubRoute: false,
        submenu: false,
      },
    ],
  },
  {
    label: "Study Tools",
    submenuOpen: true,
    submenuHdr: "Study Tools",
    submenu: false,
    showSubRoute: false,
    submenuItems: [
      {
        label: "class Recording",
        // link: routes.adminDashboard,
        icon: "ion-videocamera",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Template",
        // link: routes.adminDashboard,
        icon: "ion-laptop",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Grammar",
        // link: routes.adminDashboard,
        icon: "ti ti-clipboard-data",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Prediction File",
        // link: routes.adminDashboard,
        icon: "ion-folder",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Class Link",
        // link: routes.adminDashboard,
        icon: "ion-link",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Timetable",
        // link: routes.adminDashboard,
        icon: "ion-calendar",
        showSubRoute: false,
        submenu: false,
      },
    ],
  },
  
];
