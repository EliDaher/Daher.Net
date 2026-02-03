import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Users,
  Activity,
  CreditCard,
  ReceiptIcon,
} from "lucide-react";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import getWifiCustomers from "@/services/wifi";
import getTodyBalance, { getBalanceByDate } from "@/services/balance";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import getPendingInvoices from "@/services/invoices";
import { io, Socket } from "socket.io-client";

export default function Dashboard() {
  const navigate = useNavigate()
  const daherUser = JSON.parse(localStorage.getItem('DaherUser'))

  const [totalBalance, setTotalBalance] = useState(0)
  const [todayBalance, setTodayBalance] = useState([])
  const [monthBalance, setMonthBalance] = useState([])
  const [balanceDate, setBalanceDate] = useState('')

  const [socket, setSocket] = useState<Socket | null>(null);
  const queryClient = useQueryClient();

  const { data: pendingData, isLoading: pendingLoading } = useQuery({
    queryKey: ['pending-table'],
    queryFn: getPendingInvoices,
  });

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then(permission => {
        console.log("Notification permission:", permission);
      });
    }
  }, []);
  
  const prevDataRef = useRef<any[]>([]);
  
  useEffect(() => {
    if (pendingData && pendingData.length > 0) {
      const prevData = prevDataRef.current;

      // استخراج الطلبات الجديدة فقط
      const newItems = pendingData.filter(
        (item) => !prevData.some((prev) => prev._id === item._id)
      );

      if (newItems.length > 0) {
        // إرسال إشعار بأول عنصر جديد كمثال
        new Notification("طلب دفع جديد", {
          body: `المبلغ: ${newItems[0].amount} - الشركة: ${newItems[0].company}`,
          icon: "/logo.png"
        });

        const audio = new Audio("../../public/notification.mp3");
        audio.play();
      }

      // تحديث النسخة السابقة
      prevDataRef.current = pendingData;
    }
  }, [pendingData]);
  

  useEffect(() => {
    const newSocket = io("https://paynet-1.onrender.com");
    setSocket(newSocket);

    newSocket.on("pendingPaymentsUpdate", (updatedPayments) => {
      queryClient.setQueryData(['pending-table'], updatedPayments);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [queryClient]);

  const getMonthTable = async () => {
    const res = await getBalanceByDate("");
    if(res?.success){
      setMonthBalance(res.BalanceTable);
    }else{
      console.error(res)
    }
  }

  const { data: customers, isLoading: customersLoading } = useQuery({
    queryKey: ["customers-table"],
    queryFn: getWifiCustomers,
    select: (res) => {
      if (!res) return [];

      if (daherUser.role === "dealer") {
        return res.filter((customer) => customer.dealer === "habeb");
      }

      return res;
    },
  });

  
  const getBalance = async () => {
    const res = await getTodyBalance("")
    if (res?.success) {
      setTodayBalance(res.BalanceTable);
  
    } else {
      console.log(res?.error || "فشل جلب البيانات");
    }
    console.log(res)
  }

  useEffect(() => {
    getBalance();
  }, []);


  const totalSpeed = useMemo(() => {
    return customers?.reduce((sum, c) => sum + Number(c.SubscriptionSpeed), 0);
  }, [customers]);

  const unpaidValue = useMemo(() => {
    const totalDebt = customers
      ?.filter(c => c.Balance < 0)
      ?.reduce((sum, c) => sum + Number(c.Balance), 0);

    return Math.abs(totalDebt);
  }, [customers]);

  useEffect(()=>{

    let temValue = 0
    todayBalance.forEach(ele => {
      temValue += ele.total
    })
    setTotalBalance(temValue)
    
  }, [todayBalance])

  const customersSpeedData = useMemo(() => {
    if (!customers) return [];

    const map: Record<string, { name: string; value: number }> = {};

    customers.forEach((customer: any) => {
      const speed = customer?.SubscriptionSpeed || "غير محددة";

      if (!map[speed]) {
        map[speed] = { name: `${speed} Mbps`, value: 0 };
      }

      map[speed].value += 1;
    });

    return Object.values(map);
  }, [customers]);
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>

        {/* Stats Cards */}
        <div dir="rtl" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            onClick={() => {
              navigate("/users");
            }}
            title="عدد مشتركين الفضائي"
            value={customers?.length || 0}
            icon={Users}
          />
          <StatsCard
            onClick={() => {
              navigate("/users", { state: "unpaid" });
            }}
            title="ديون الفضائي"
            value={unpaidValue || 0}
            icon={CreditCard}
          />
          {daherUser.role != "admin" ? (
            <></>
          ) : (
            <>
              <StatsCard
                onClick={() => {
                  navigate("/PendingTransactions");
                }}
                title="الفواتير الغير مدفوعة"
                value={pendingData ? pendingData.length : 0}
                icon={ReceiptIcon}
              />
            </>
          )}
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2 text-center">
          <ChartContainer
            className="mdL:col-span-2"
            title=" توزع المرسلات "
            data={customers?.reduce((acc, customer) => {
              const sender = (customer.sender ?? "").trim();
              const SubscriptionSpeed = Number(customer.SubscriptionSpeed);

              const existing = acc.find((item) => item.sender === sender);

              if (existing) {
                existing.totalSpeed += SubscriptionSpeed;
                existing.customerCount += 1;
              } else {
                acc.push({
                  sender,
                  totalSpeed: SubscriptionSpeed,
                  customerCount: 1,
                });
              }

              return acc;
            }, [])}
            type="bar"
            dataKey2="customerCount"
            dataKey="totalSpeed"
          />

          {daherUser.role != "admin" ? (
            <></>
          ) : (
            <>
              <ChartContainer
                title="صناديق اليوم"
                data={todayBalance}
                type="line"
                dataKey2="count"
                desc={totalBalance.toString()}
                dataKey="total" // OK لأنك استخدمته أثناء التحويل
              />
            </>
          )}

          <ChartContainer
            title="عدد المشتركين حسب السرعة"
            type="pie"
            dataKey="value"
            data={customersSpeedData}
            desc={totalSpeed?.toString() + " Mbps"}
          />
        </div>

        {daherUser.role != "admin" ? (
          <></>
        ) : (
          <>
            {/* Advanced Analytics */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger onClick={getMonthTable} value="analytics">
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-6 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Active Users
                      </CardTitle>
                      <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2,350</div>
                      <p className="text-xs text-muted-foreground">
                        +180.1% from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Revenue
                      </CardTitle>
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$45,231.89</div>
                      <p className="text-xs text-muted-foreground">
                        +20.1% from last month
                      </p>
                    </CardContent>
                  </Card>

                  <ChartContainer
                    title="Revenue Distribution"
                    data={customers?.slice(0, 4) || []}
                    type="pie"
                    dataKey="revenue"
                  />
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <div className="grid gap-6">
                  <div className="bg-background/80 text-foreground">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["DatePicker", "DatePicker", "DatePicker"]}
                      >
                        <DatePicker
                          views={["month", "year"]}
                          value={dayjs(balanceDate)}
                          onChange={(newValue) => {
                            const formatted = newValue.format("YYYY-MM");
                            setBalanceDate(formatted);
                            getBalanceByDate(formatted).then((res) => {
                              if (res?.success) {
                                setMonthBalance(res.BalanceTable);
                              }
                            });
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <ChartContainer
                    title="صناديق الشهر الحالي"
                    data={monthBalance || []}
                    type="stackBar"
                    dataKey="users"
                  />
                </div>
              </TabsContent>

              <TabsContent value="reports" className="space-y-4">
                <div className="text-center py-8">
                  <h3 className="text-lg font-semibold">Reports Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Advanced reporting features will be available soon.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
