import { lazy, type ReactElement } from "react";
import { PrivateRoute } from "@/components/auth/PrivateRoute";
import UpdatePrice from "./pages/UpdatePrice";
import UpdatePriceDetails from "./pages/UpdatePriceDetails";

const POSUsers = lazy(() => import("@/pages/POSUsers"));
const Companies = lazy(() => import("@/pages/Companies"));
const CompanyDetails = lazy(() => import("@/pages/CompanyDetails"));
const CompaniesLogs = lazy(() => import("@/pages/CompaniesLogs"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Analytics = lazy(() => import("@/pages/Analytics"));
const Users = lazy(() => import("@/pages/Users"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Login = lazy(() => import("@/pages/Login"));
const SignUp = lazy(() => import("@/pages/SignUp"));
const UnauthorizedPage = lazy(() => import("@/pages/Unauthorized"));
const CustomerDetails = lazy(() => import("@/pages/CustomerDetails"));
const DealerBalance = lazy(() => import("@/pages/DealerBalance"));
const Balance = lazy(() => import("@/pages/Balance"));
const Invoices = lazy(() => import("@/pages/Invoices"));
const MyBalance = lazy(() => import("@/pages/MyBalance"));
const PendingTransactions = lazy(() => import("@/pages/PendingTransactions"));
const DoneTransactions = lazy(() => import("@/pages/DoneTransactions"));
const POSPayments = lazy(() => import("@/pages/POSPayments"));
const POSBalance = lazy(() => import("@/pages/POSBalance"));
const BillBalance = lazy(() => import("@/pages/BillBalance"));
const ViewProduct = lazy(() => import("@/pages/ViewProduct"));
const InquiryLogs = lazy(() => import("@/pages/InquiryLogs"));
const ViewBills = lazy(() => import("@/pages/ViewBills"));
const ViewBillsDetails = lazy(() => import("@/pages/ViewBillsDetails"));
const FinancialStatement = lazy(() => import("@/pages/FinancialStatement"));
const Employees = lazy(() => import("@/pages/Employees"));

interface AppRoute {
  path: string;
  element: ReactElement;
}

function withPrivateRoute(element: ReactElement, allowedRoles: string[]) {
  return <PrivateRoute allowedRoles={allowedRoles}>{element}</PrivateRoute>;
}

export const routesConfig: AppRoute[] = [
  { path: "/login", element: <Login /> },
  { path: "/signUp", element: <SignUp /> },
  { path: "/unauthorized", element: <UnauthorizedPage /> },
  {
    path: "/dashboard",
    element: withPrivateRoute(<Dashboard />, ["admin", "dealer"]),
  },
  {
    path: "/dealerBalance",
    element: withPrivateRoute(<DealerBalance />, ["dealer", "admin"]),
  },
  {
    path: "/balance",
    element: withPrivateRoute(<Balance />, ["admin"]),
  },
  {
    path: "/ViewProducts",
    element: withPrivateRoute(<ViewProduct />, ["admin", "employee"]),
  },
  {
    path: "/viewBills",
    element: withPrivateRoute(<ViewBills />, ["admin", "employee"]),
  },
  {
    path: "/viewBills/:id",
    element: withPrivateRoute(<ViewBillsDetails />, ["admin", "employee"]),
  },
  {
    path: "/users",
    element: withPrivateRoute(<Users />, ["admin", "dealer", "employee"]),
  },
  {
    path: "/CustomerDetails/:id",
    element: withPrivateRoute(<CustomerDetails />, ["admin", "dealer", "employee"]),
  },
  {
    path: "/analytics",
    element: withPrivateRoute(<Analytics />, ["admin"]),
  },
  {
    path: "/invoices",
    element: withPrivateRoute(<Invoices />, ["admin", "employee"]),
  },
  {
    path: "/myBalance",
    element: withPrivateRoute(<MyBalance />, ["admin", "employee"]),
  },
  {
    path: "/employees",
    element: withPrivateRoute(<Employees />, ["admin", "employee"]),
  },
  {
    path: "/PendingTransactions",
    element: withPrivateRoute(<PendingTransactions />, ["admin", "employee"]),
  },
  {
    path: "/DoneTransactions",
    element: withPrivateRoute(<DoneTransactions />, ["admin", "employee"]),
  },
  {
    path: "/POSPayments",
    element: withPrivateRoute(<POSPayments />, ["admin", "employee"]),
  },
  {
    path: "/POSBalance",
    element: withPrivateRoute(<POSBalance />, ["admin"]),
  },
  {
    path: "/UpdatePrices",
    element: withPrivateRoute(<UpdatePrice />, ["admin", "employee"]),
  },
  {
    path: "/UpdatePrice/:id",
    element: withPrivateRoute(<UpdatePriceDetails />, ["admin", "employee"]),
  },
  {
    path: "/BillBalance",
    element: withPrivateRoute(<BillBalance />, ["admin", "employee"]),
  },
  {
    path: "/POSUsers",
    element: withPrivateRoute(<POSUsers />, ["admin", "employee"]),
  },
  {
    path: "/FinancialStatement",
    element: withPrivateRoute(<FinancialStatement />, ["admin", "employee"]),
  },
  {
    path: "/InquiryLogs",
    element: withPrivateRoute(<InquiryLogs />, ["admin"]),
  },
  {
    path: "/companies/logs",
    element: withPrivateRoute(<CompaniesLogs />, ["admin", "employee"]),
  },
  {
    path: "/companies/:companyId",
    element: withPrivateRoute(<CompanyDetails />, ["admin", "employee"]),
  },
  {
    path: "/companies",
    element: withPrivateRoute(<Companies />, ["admin", "employee"]),
  },
  { path: "*", element: <NotFound /> },
];
