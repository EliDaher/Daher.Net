import React from "react";
import { PrivateRoute } from "@/components/auth/PrivateRoute";
import POSUsers from "./pages/POSUsers";

// Lazy Loading للصفحات
const Dashboard = React.lazy(() => import("@/pages/Dashboard"));
const Analytics = React.lazy(() => import("@/pages/Analytics"));
const Users = React.lazy(() => import("@/pages/Users"));
const NotFound = React.lazy(() => import("@/pages/NotFound"));
const Login = React.lazy(() => import("@/pages/Login"));
const SignUp = React.lazy(() => import("@/pages/SignUp"));
const UnauthorizedPage = React.lazy(() => import("@/pages/Unauthorized"));
const CustomerDetails = React.lazy(() => import("@/pages/CustomerDetails"));
const DealerBalance = React.lazy(() => import("@/pages/DealerBalance"));
const Balance = React.lazy(() => import("@/pages/Balance"));
const Invoices = React.lazy(() => import("@/pages/Invoices"));
const MyBalance = React.lazy(() => import("@/pages/MyBalance"));
const PendingTransactions = React.lazy(() => import("@/pages/PendingTransactions"));
const DoneTransactions = React.lazy(() => import("@/pages/DoneTransactions"));
const POSPayments = React.lazy(() => import("@/pages/POSPayments"));
const BillBalance = React.lazy(() => import("@/pages/BillBalance"));

export const routesConfig = [
  { path: "/login", element: <Login /> },
  { path: "/signUp", element: <SignUp /> },
  { path: "/unauthorized", element: <UnauthorizedPage /> },
  { path: "/dashboard", element: <PrivateRoute allowedRoles={["admin", "dealer"]}><Dashboard /></PrivateRoute> },
  { path: "/dealerBalance", element: <PrivateRoute allowedRoles={["dealer", "admin"]}><DealerBalance /></PrivateRoute> },
  { path: "/balance", element: <PrivateRoute allowedRoles={["admin"]}><Balance /></PrivateRoute> },
  { path: "/users", element: <PrivateRoute allowedRoles={["admin", "dealer"]}><Users /></PrivateRoute> },
  { path: "/CustomerDetails/:id", element: <PrivateRoute allowedRoles={["admin", "dealer"]}><CustomerDetails /></PrivateRoute> },
  { path: "/analytics", element: <PrivateRoute allowedRoles={["admin"]}><Analytics /></PrivateRoute> },
  { path: "/invoices", element: <PrivateRoute allowedRoles={["admin", "employee"]}><Invoices /></PrivateRoute> },
  { path: "/myBalance", element: <PrivateRoute allowedRoles={["admin", "employee"]}><MyBalance /></PrivateRoute> },
  { path: "/PendingTransactions", element: <PrivateRoute allowedRoles={["admin", "employee"]}><PendingTransactions /></PrivateRoute> },
  { path: "/DoneTransactions", element: <PrivateRoute allowedRoles={["admin", "employee"]}><DoneTransactions /></PrivateRoute> },
  { path: "/POSPayments", element: <PrivateRoute allowedRoles={["admin", "employee"]}><POSPayments /></PrivateRoute> },
  { path: "/BillBalance", element: <PrivateRoute allowedRoles={["admin", "employee"]}><BillBalance /></PrivateRoute> },
  { path: "/POSUsers", element: <PrivateRoute allowedRoles={["admin"]}><POSUsers /></PrivateRoute> },
  { path: "*", element: <NotFound /> }
];
