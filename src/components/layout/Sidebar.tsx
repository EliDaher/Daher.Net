import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Home,
  Users,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  WalletIcon,
  ReceiptText,
  HandCoins,
  FileText,
  CheckIcon,
  ArrowDownCircle,
  Wallet,
  User,
  Table,
  PackagePlus,  
  Boxes,
  Table2Icon,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import DaherLogo from "../ui/logo";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useEffect } from "react";

const navigationGroups = [
  {
    title: "WiFi",
    items: [
      {
        name: "Customers",
        href: "/users",
        icon: Users,
        allowed: ["admin", "dealer", "employee"],
      },
      {
        name: "Balance",
        href: "/balance",
        icon: WalletIcon,
        allowed: ["admin"],
      },
      {
        name: "Balance",
        href: "/dealerBalance",
        icon: WalletIcon,
        allowed: ["dealer"],
      },
    ],
    allowed: ["admin", "dealer", "employee"],
  },
  {
    title: "Billing",
    items: [
      {
        name: "Invoices",
        href: "/invoices",
        icon: ReceiptText,
        allowed: ["admin", "employee"],
      },
      {
        name: "My Balance",
        href: "/myBalance",
        icon: HandCoins,
        allowed: ["admin", "employee"],
      },
      {
        name: "Balance",
        href: "/BillBalance",
        icon: Wallet,
        allowed: ["admin"],
      },
      {
        name: "Financial Statement",
        href: "/FinancialStatement",
        icon: Table2Icon,
        allowed: ["admin", "employee"],
      },
    ],
    allowed: ["admin", "employee"],
  },
  {
    title: "POS",
    items: [
      {
        name: "Users",
        href: "/POSUsers",
        icon: User,
        allowed: ["admin", "employee"],
      },
      {
        name: "Pending Transactions",
        href: "/PendingTransactions",
        icon: FileText,
        allowed: ["admin", "employee"],
      },
      {
        name: "Done Transactions",
        href: "/DoneTransactions",
        icon: CheckIcon,
        allowed: ["admin", "employee"],
      },
      {
        name: "Payments",
        href: "/POSPayments",
        icon: ArrowDownCircle,
        allowed: ["admin", "employee"],
      },
            {
        name: "Add Products",
        href: "/AddProducts",
        icon: PackagePlus,
        allowed: ["admin", "employee"],
      },
      {
        name: "View Products",
        href: "/ViewProducts",
        icon: Boxes,
        allowed: ["admin", "employee"],
      },
   ],
    allowed: ["admin", "employee"],
  },
  {
    title: "Analytics",
    items: [
      {
        name: "Analytics",
        href: "/analytics",
        icon: BarChart3,
        allowed: ["admin"],
      },
      {
        name: "Inquiry Logs",
        href: "/InquiryLogs",
        icon: Table,
        allowed: ["admin"],
      },
    ],
    allowed: ["admin"],
  },
  {
    title: "Companies",
    items: [
      {
        name: "Companies",
        href: "/companies",
        icon: Building2,
        allowed: ["admin", "employee"],
      },
      {
        name: "Logs",
        href: "/companies/logs",
        icon: Table2Icon,
        allowed: ["admin", "employee"],
      },
    ],
    allowed: ["admin", "employee"],
  },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const userStr = localStorage.getItem("DaherUser");
  const user = JSON.parse(userStr);

  const isDashboardActive = location.pathname === "/dashboard";

  return (
    <div
      className={cn(
        "relative flex h-full flex-col border-r bg-sidebar transition-all duration-300 ease-in-out shadow-md",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-accent">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <DaherLogo className="fill-transparent" />
            <span className="font-bold text-lg text-sidebar-foreground tracking-wide">
              Daher.Net
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8 rounded-full text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Dashboard Link */}
      {['admin', 'dealer'].includes(user.role) && <nav className="px-2 py-3">
        <Link
          to="/dashboard"
          className={cn(
            "flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors",
            isDashboardActive
              ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-inner"
              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          )}
        >
          <Home className="h-5 w-5 flex-shrink-0 mr-3" />
          {!isCollapsed && "Dashboard"}
        </Link>
      </nav>}

      {/* Other Navigation Groups */}
      <nav className="flex-1 px-2 py-2 overflow-y-auto">
        {navigationGroups.map((group) => (
          group.allowed.includes(user.role) &&
          <Accordion type="single" collapsible key={group.title} className="mb-2">
            <AccordionItem value={group.title} className="border-none">
              <AccordionTrigger
                className={cn(
                  "flex items-center justify-between text-sidebar-foreground font-semibold px-2 py-2 rounded-md hover:bg-sidebar-accent transition-colors",
                  isCollapsed && "hidden"
                )}
              >
                <span>{group.title}</span>
              </AccordionTrigger>
              <AccordionContent
                className={cn(
                  "space-y-1 mt-1 pl-2 transition-all duration-300 ease-in-out",
                  isCollapsed && "hidden"
                )}
              >
                {group.items.map((item) => {
                  const isActive = location.pathname === item.href;
                  if (
                    item.name == "Users" &&
                    !["sara", "fadi", "fade"].includes(user.username) &&
                    user.role == "employee"
                  ) {
                    return null;
                  } else
                    return (
                      item.allowed.includes(user.role) && (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={cn(
                            "group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors",
                            isActive
                              ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-inner"
                              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          )}
                        >
                          <item.icon className="h-5 w-5 flex-shrink-0 mr-3" />
                          {!isCollapsed && item.name}
                        </Link>
                      )
                    );
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </nav>
    </div>
  );
}
