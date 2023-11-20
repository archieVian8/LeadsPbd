const routes = [
  // Landing Starts here.
  {
    path: "/",
    component: () => import("layouts/BlankLayout.vue"),
    children: [
      {
        path: "",
        name: "Roles",
        component: () => import("pages/landing/Roles.vue"),
      },
    ],
  },

  {
    path: "/roles",
    component: () => import("layouts/BlankLayout.vue"),
    children: [
      {
        path: "admin",
        name: "confirmAdmin",
        component: () => import("pages/landing/Admin.vue"),
      },
      {
        path: "volunteer",
        name: "confirmVolunteer",
        component: () => import("pages/landing/Volunteer.vue"),
      },
    ],
  },

  {
    path: "/auth",
    component: () => import("layouts/BlankLayout.vue"),
    children: [
      {
        path: "admin/login",
        name: "adminLogin",
        component: () => import("pages/landing/auth/admin/Login.vue"),
      },
      {
        path: "admin/register",
        name: "adminRegister",
        component: () => import("pages/landing/auth/admin/Register.vue"),
      },
            {
        path: "volunteer/login",
        name: "volunteerLogin",
        component: () => import("pages/landing/auth/volunteer/Login.vue"),
      },
      {
        path: "volunteer/register",
        name: "volunteerRegister",
        component: () => import("pages/landing/auth/volunteer/Register.vue"),
      },
    ],
  },
  // {
  //   path: "/roles",
  //   component: () => import("layouts/BlankLayout.vue"),
  //   children: [
  //     {
  //       path: "admin",
  //       name: "AdminAuth",
  //       component: () => import("pages/landing/Admin.vue"),
  //     },
  //     {
  //       path: "volunteer",
  //       name: "VolunteerAuth",
  //       component: () => import("pages/landing/Volunteer.vue"),
  //     },
  //   ],
  // },

  // Volunteer Starts here.
  {
    path: "/volunteer",
    component: () => import("layouts/volunteer/WithFooter.vue"),
    props: { pageTitle: "PENGGUNA" },
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("pages/volunteer/home/home.vue"),
      },
      {
        path: "viewNeeds",
        name: "viewNeeds",
        component: () => import("pages/volunteer/home/viewNeeds.vue"),
      },
      {
        path: "donateEvac",
        name: "donateEvac",
        component: () => import("pages/volunteer/home/donateEvac.vue"),
      },
      {
        path: "maps",
        name: "Maps",
        component: () => import("pages/volunteer/viewMaps/map.vue"),
      },
      {
        path: "sortBy",
        name: "Sort By",
        component: () => import("pages/volunteer/sortBy/sortBy.vue"),
      },
      {
        path: "reports",
        name: "Reports",
        component: () => import("src/pages/volunteer/reports/Reports.vue"),
      },
      {
        path: "historyDonate",
        name: "History Donate",
        component: () => import("src/pages/volunteer/home/historyDonate.vue"),
      },
    ],
  },

  {
    path: "/volunteer/reports",
    component: () => import("src/pages/landing/Admin.vue"),
    children: [
      {
        path: "details",
        name: "ReportsDetails",
        component: () => import("pages/volunteer/reports/ReportsDetails.vue"),
      },
    ],
  },

  {
    path: "/volunteer/disaster",
    component: () => import("layouts/volunteer/NoFooter.vue"),
    children: [
      {
        path: "",
        name: "Details",
        component: () => import("pages/volunteer/disaster/disasterDetails.vue"),
      },
    ],
  },

  {
    path: "/volunteer/donation",
    component: () => import("layouts/volunteer/NoFooter.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/volunteer/donation/donationStatus.vue"),
      },
      {
        path: "details",
        component: () => import("pages/volunteer/donation/DonationDetails.vue"),
      },
    ],
  },

  {
    path: "/volunteer/donate",
    component: () => import("layouts/volunteer/NoFooter.vue"),
    children: [
      {
        path: "",
        name: "Donate",
        component: () => import("pages/volunteer/donate/DonateTypes.vue"),
      },
      {
        path: "overview",
        name: "Donate",
        component: () => import("pages/volunteer/donate/DonateOverview.vue"),
      },
      {
        path: "details",
        name: "Donate",
        component: () => import("pages/volunteer/donate/DonateDetails.vue"),
      },
      {
        path: "success",
        name: "Donate",
        component: () => import("pages/volunteer/donate/DonateSuccess.vue"),
      },
      {
        path: "failed",
        name: "Donate",
        component: () => import("pages/volunteer/donate/DonateFailed.vue"),
      },
    ],
  },
  // Volunteer Ends here.

  //Administator Starts here.
  {
    path: "/admin",
    component: () => import("layouts/admin/NoFooter.vue"),
    props: { pageTitle: "ADMIN" },
    children: [
      {
        path: "",
        name: "Role",
        component: () => import("pages/admin/Home/Home.vue"),
        props: { pageTitle: "Beranda" },
      },
      {
        path: "add-disaster",
        name: "Location",
        component: () => import("pages/admin/AddDisaster/AddDisaster.vue"),
        props: { pageTitle: "Tambah Bencana" },
      },
      {
        path: "evacuation",
        name: "Evacuation",
        component: () => import("pages/admin/AddEvacuation/ChooseDisaster.vue"),
        props: { pageTitle: "Tambah Evakuasi" },
      },
      {
        path: "edit-location",
        name: "Edit",
        component: () => import("pages/admin/ViewEdit/MapView.vue"),
        props: { pageTitle: "Edit Lokasi" },
      },
      {
        path: "donation",
        name: "Donation",
        component: () => import("pages/admin/DonationValidate/Donations.vue"),
        props: { pageTitle: "Validasi Donasi" },
      },
      {
        path: "reports",
        name: "view Disaster",
        component: () => import("pages/admin/RecoveryReports/viewDisaster.vue"),
        props: { pageTitle: "Laporan Kemajuan" },
      },
      {
        path: "userValidate",
        name: "userValidate",
        component: () => import("pages/admin/UserValidate/UserValidate.vue"),
        props: { pageTitle: "Aktivasi Akun Pengguna" },
      },
    ],
  },

  {
    path: "/admin/add-disaster",
    component: () => import("layouts/admin/NoFooter.vue"),
    children: [
      {
        path: "maps",
        component: () => import("pages/admin/AddDisaster/ViewMap.vue"),
      },
      {
        path: "finish",
        component: () => import("pages/admin/AddDisaster/FinishMap.vue"),
      },
    ],
  },

  {
    path: "/admin/evacuation",
    component: () => import("layouts/admin/NoFooter.vue"),
    props: { pageTitle: "EVAKUASI" },
    children: [
      {
        path: "disaster-id",
        component: () => import("pages/admin/AddEvacuation/DisasterID.vue"),
      },
      {
        path: "needsedit",
        component: () => import("pages/admin/AddEvacuation/NeedsEdit.vue"),
      },
      {
        path: "victimedit",
        component: () => import("pages/admin/AddEvacuation/VictimEdit.vue"),
      },
    ],
  },

  {
    path: "/admin/evacuation/disaster-id",
    component: () => import("layouts/admin/NoFooter.vue"),
    props: { pageTitle: "EVAKUASI" },
    children: [
      {
        path: "locations",
        component: () =>
          import("pages/admin/AddEvacuation/EvacuationLocations.vue"),
      },
      {
        path: "evacuation-id",
        component: () => import("pages/admin/AddEvacuation/EvacuationID.vue"),
      },
    ],
  },

  {
    path: "/admin/edit-location",
    component: () => import("layouts/admin/NoFooter.vue"),
    children: [
      {
        path: "disaster-id",
        component: () => import("pages/admin/ViewEdit/DisasterDetails.vue"),
      },
    ],
  },

  {
    path: "/admin/edit-location/disaster-id",
    component: () => import("layouts/admin/NoFooter.vue"),
    children: [
      {
        path: "location",
        component: () => import("pages/admin/ViewEdit/EditLocation.vue"),
      },
      {
        path: "victim",
        component: () => import("pages/admin/ViewEdit/EditVictim.vue"),
      },
      {
        path: "damage",
        component: () => import("pages/admin/ViewEdit/EditDamage.vue"),
      },
      {
        path: "medics",
        component: () => import("pages/admin/ViewEdit/EditMedical.vue"),
      },
      {
        path: "logistics",
        component: () => import("pages/admin/ViewEdit/Logistics.vue"),
      },
    ],
  },

  {
    path: "/admin/edit-location/disaster-id/victim",
    component: () => import("layouts/admin/NoFooter.vue"),
    children: [
      {
        path: "types",
        component: () => import("pages/admin/ViewEdit/EditVictimTypes.vue"),
      },
    ],
  },

  {
    path: "/admin/donation",
    component: () => import("layouts/admin/NoFooter.vue"),
    children: [
      {
        path: "donation-id",
        component: () => import("pages/admin/DonationValidate/DonationID.vue"),
      },
    ],
  },

  {
    path: "/admin/reports",
    component: () => import("layouts/admin/NoFooter.vue"),
    props: { pageTitle: "ADMIN" },
    children: [
      {
        path: "reportEvac",
        name: "Reports Evac",
        component: () => import("pages/admin/RecoveryReports/Reports.vue"),
      },
      {
        path: "Details",
        name: "Details Reports Evac",
        component: () => import("pages/admin/RecoveryReports/Details.vue"),
      },
    ],
  },

  // {
  //   path: "/admin/reports/disaster-id",
  //   component: () => import("layouts/admin/NoFooter.vue"),
  //   children: [
  //     {
  //       path: "details",
  //       component: () => import("pages/admin/RecoveryReports/Details.vue"),
  //     },
  //   ],
  // },
  //Administator Ends here.

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
