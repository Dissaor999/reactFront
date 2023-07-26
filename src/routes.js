import SalesOrders from "views/SalesOrders/SalesOrders.js";
import Pos from "views/SalesOrders/Pos.js";
import Clients from "views/SalesOrders/Clients.js";
import SalesChannel from "views/SalesOrders/SalesChannel.js";
import Payments from "views/SalesOrders/Payments.js";
import User from "views/Users/user.js";
import Permissions from "views/Users/permissions.js";
import Items from "views/Items/Items.js";
import Invoices from "views/Invoices/Invoices.js";
import ToInvoice from "views/Invoices/toInvoice.js";


import LoginPage from "views/Pages/LoginPage.js";
// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
//import Timeline from "@material-ui/icons/Timeline";


var dashRoutes = [
  {
    collapse: true,
    name: "Usuarios",
    icon: DashboardIcon,
    state: "userCollapse",
    views: [
      {
        path: "/userList",
        name: "Lista de usuarios",
        mini: "U",
        component: User,
        layout: "/admin",
      },
      {
        path: "/permissions",
        name: "Permisos",
        mini: "P",
        component: Permissions,
        layout: "/admin",
      }   

    ]
  },
  {
    collapse: true,
    name: "Ventas",
    icon: DashboardIcon,
    state: "salesCollapse",
    views: [
      {
        path: "/salesOrders",
        name: "Ordenes de venta",
        mini: "so",
        component: SalesOrders,
        layout: "/admin",
      },
      {
        path: "/Pos",
        name: "POS",
        mini: "p",
        component: Pos,
        layout: "/admin",
      },
      {
        path: "/Clients",
        name: "Clientes",
        mini: "c",
        component: Clients,
        layout: "/admin",
      },
      {
        path: "/PaymentTypes",
        name: "Metodos de Pago",
        mini: "Pay",
        component: Payments,
        layout: "/admin",
      },
      {
        path: "/SalesChannel",
        name: "Canales de Venta",
        mini: "CV",
        component: SalesChannel,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Inventario",
    icon: DashboardIcon,
    state: "invCollapse",
    views: [
      {
        path: "/itemsList",
        name: "Articulos",
        mini: "A",
        component: Items,
        layout: "/admin",
      },
    ]
  },
  {
    collapse: true,
    name: "Facturas",
    icon: DashboardIcon,
    state: "billsCollapse",
    views: [
      {
        path: "/invoicedOrders",
        name: "Facturadas",
        mini: "Fact",
        component: Invoices,
        layout: "/admin",
      },
      {
        path: "/invoisingOrders",
        name: "Por Facturar",
        mini: "SO",
        component: ToInvoice,
        layout: "/admin",
      },
    ]
  },
  {
    path: "/login-page",
    component: LoginPage,
    layout: "/auth",
    
  },
];

export default dashRoutes;
