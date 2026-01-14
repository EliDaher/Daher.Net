import React from "react";
import { PrivateRoute } from "@/components/auth/PrivateRoute";
import POSUsers from "./pages/POSUsers";
import Companies from "./pages/Companies";
import CompaniesLogs from "./pages/CompaniesLogs";

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
const AddProduct = React.lazy(()=>import('@/pages/AddProduct'))
const ViewProduct = React.lazy(()=>import('@/pages/ViewProduct'))

const InquiryLogs = React.lazy(() => import("@/pages/InquiryLogs"));
const FinancialStatement = React.lazy(
  () => import("@/pages/FinancialStatement"),
);

export const routesConfig = [
  { path: "/login", element: <Login /> },
  { path: "/signUp", element: <SignUp /> },
  { path: "/unauthorized", element: <UnauthorizedPage /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute allowedRoles={["admin", "dealer"]}>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/dealerBalance",
    element: (
      <PrivateRoute allowedRoles={["dealer", "admin"]}>
        <DealerBalance />
      </PrivateRoute>
    ),
  },
  {
    path: "/balance",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <Balance />
      </PrivateRoute>
    ),
  },
  {
    path: "/ViewProducts",
    element: (
      <PrivateRoute allowedRoles={["admin", "employee"]}>
        <ViewProduct />
      </PrivateRoute>
    ),
  },
  {
    path: "/users",
    element: (
      <PrivateRoute allowedRoles={["admin", "dealer", "employee"]}>
        <Users />
      </PrivateRoute>
    ),
  },
  {
    path: "/CustomerDetails/:id",
    element: (
      <PrivateRoute allowedRoles={["admin", "dealer", "employee"]}>
        <CustomerDetails />
      </PrivateRoute>
    ),
  },
  {
    path: "/analytics",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <Analytics />
      </PrivateRoute>
    ),
  },
  {
    path: "/invoices",
    element: (
      <PrivateRoute allowedRoles={["admin", "employee"]}>
        <Invoices />
      </PrivateRoute>
    ),
  },
  {
    path: "/myBalance",
    element: (
      <PrivateRoute allowedRoles={["admin", "employee"]}>
        <MyBalance />
      </PrivateRoute>
    ),
  },
  {
    path: "/PendingTransactions",
    element: (
      <PrivateRoute allowedRoles={["admin", "employee"]}>
        <PendingTransactions />
      </PrivateRoute>
    ),
  },
  {
    path: "/DoneTransactions",
    element: (
      <PrivateRoute allowedRoles={["admin", "employee"]}>
        <DoneTransactions />
      </PrivateRoute>
    ),
  },
  {
    path: "/POSPayments",
    element: (
      <PrivateRoute allowedRoles={["admin", "employee"]}>
        <POSPayments />
      </PrivateRoute>
    ),
  },
  {
    path: "/BillBalance",
    element: (
      <PrivateRoute allowedRoles={["admin", "employee"]}>
        <BillBalance />
      </PrivateRoute>
    ),
  },
  {
    path: "/POSUsers",
    element: (
      <PrivateRoute allowedRoles={["admin", "employee"]}>
        <POSUsers />
      </PrivateRoute>
    ),
  },
  {
    path: "/FinancialStatement",
    element: (
      <PrivateRoute allowedRoles={["admin", "employee"]}>
        <FinancialStatement />
      </PrivateRoute>
    ),
  },
  {
    path: "/InquiryLogs",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <InquiryLogs />
      </PrivateRoute>
    ),
  },
  {
    path: "/companies/logs",
    element: (
      <PrivateRoute allowedRoles={["admin", "employee"]}>
        <CompaniesLogs />
      </PrivateRoute>
    ),
  },
  {
    path: "/companies",
    element: (
      <PrivateRoute allowedRoles={["admin", "employee"]}>
        <Companies />
      </PrivateRoute>
    ),
  },
  { path: "*", element: <NotFound /> },
];
