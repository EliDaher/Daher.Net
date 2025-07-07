import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Users,
  FileText,
  CheckSquare,
  TrendingUp,
  Activity,
  CreditCard,
} from "lucide-react";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { DataTable } from "@/components/dashboard/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiService, User, Post } from "@/services/api";
import getWifiCustomers from "@/services/wifi";
import getTodyBalance, { getBalanceByDate } from "@/services/balance";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate()

  const [totalBalance, setTotalBalance] = useState(0)
  const [customers, setCustomers] = useState([])
  const [todayBalance, setTodayBalance] = useState([])
  const [monthBalance, setMonthBalance] = useState([])
  const [balanceDate, setBalanceDate] = useState('')

  const getMonthTable = async () => {
    const res = await getBalanceByDate("");
    if(res?.success){
      setMonthBalance(res.BalanceTable);
    }else{
      console.error(res)
    }
  }

  const getCustomers = async () => {
    const res = await getWifiCustomers();

    if (res?.success) {
      setCustomers(res.customers);

    } else {
      alert(res?.error || "فشل جلب البيانات");
    }
  };
  
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
    getCustomers();
    getBalance();
    getMonthTable();
  }, []);


  const totalSpeed = useMemo(() => {
    return customers.reduce((sum, c) => sum + Number(c.SubscriptionSpeed), 0);
  }, [customers]);

  const unpaidValue = useMemo(() => {
    const totalDebt = customers
      .filter(c => c.Balance < 0)
      .reduce((sum, c) => sum + Number(c.Balance), 0);

    return Math.abs(totalDebt);
  }, [customers]);

  useEffect(()=>{

    let temValue = 0
    todayBalance.forEach(ele => {
      temValue += ele.total
    })
    setTotalBalance(temValue)

  }, [todayBalance])

  // Fetch dashboard data using React Query
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: apiService.getDashboardStats,
  });


  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: apiService.getUsers,
  });

  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: apiService.getPosts,
  });

  // Transform data for tables
  const userTableData =
    users?.slice(0, 10).map((user: User) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      company: user.company.name,
      status: Math.random() > 0.5 ? "active" : "inactive",
    })) || [];

  const postTableData =
    posts?.slice(0, 8).map((post: Post) => ({
      id: post.id,
      title: post.title.substring(0, 50) + "...",
      author: `User ${post.userId}`,
      status: Math.random() > 0.3 ? "published" : "draft",
      date: new Date().toLocaleDateString(),
    })) || [];

  const userColumns = [
    { key: "id", label: "ID", sortable: true },
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "company", label: "Company", sortable: true },
    { key: "status", label: "Status", sortable: true },
  ];

  const postColumns = [
    { key: "id", label: "ID", sortable: true },
    { key: "title", label: "Title", sortable: true },
    { key: "author", label: "Author", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "date", label: "Date", sortable: true },
  ];

  if (statsLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            onClick={()=>{
              navigate('/users')
            }}
            title="عدد مشتركين الفضائي"
            value={customers.length || 0}
            description="from last month"
            icon={Users}
            trend={{ value: stats?.userGrowth || 0, isPositive: true }}
          />
          <StatsCard
            onClick={()=>{
              navigate('/users', {state: 'unpaid'})
            }}
            title="الفواتير الغير مدفوعة"
            value={unpaidValue || 0}
            description=""
            icon={CreditCard}
            trend={{ value: stats?.userGrowth || 0, isPositive: true }}
          />
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2 text-center">
          <ChartContainer
            className="mdL:col-span-2"
            title=" توزع المرسلات "
            data={

              customers.reduce((acc, customer) => {
                const sender = (customer.sender ?? '').trim();
                const SubscriptionSpeed = Number(customer.SubscriptionSpeed);

                const existing = acc.find(item => item.sender === sender);

                if (existing) {
                  existing.totalSpeed += SubscriptionSpeed;
                  existing.customerCount += 1;
                } else {
                  acc.push({
                    sender,
                    totalSpeed: SubscriptionSpeed,
                    customerCount: 1
                  });
                }
              
                return acc;
              }, [])
            
            }
            type="bar"
            dataKey2='customerCount'
            dataKey="totalSpeed"
          />
          <ChartContainer
            title="صناديق اليوم"
            data={todayBalance}
            type="line"
            dataKey2='count'
            desc={totalBalance.toString()}
            dataKey="total" // OK لأنك استخدمته أثناء التحويل
          />
          <ChartContainer
            title="عدد المشتركين حسب السرعة"
            type="pie"
            dataKey="value"
            data={
              Object.values(
                customers.reduce(
                  (acc: Record<string, { name: string; value: number }>, customer: any) => {
                    const speed = customer.SubscriptionSpeed || "غير محددة";
                    if (!acc[speed]) {
                      acc[speed] = { name: `${speed} Mbps`, value: 0 };
                    }
                    acc[speed].value += 1;
                    return acc;
                  },
                  {}
                )
              )
            }
            desc={
              totalSpeed.toString() + ' Mbps'
            }
          />

        </div>

        {/* Advanced Analytics */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
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
                  <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
                    <DatePicker
                      views={['month', 'year']}
                      value={dayjs(balanceDate)}
                      onChange={(newValue) => {
                        const formatted = newValue.format('YYYY-MM');
                        setBalanceDate(formatted);
                        getBalanceByDate(formatted).then(res => {
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

        {/* Data Tables */}
        <div className="grid gap-6 lg:grid-cols-2">
          <DataTable
            title="Recent Users"
            description="Latest user registrations"
            columns={userColumns}
            data={userTableData}
          />
          <DataTable
            title="Recent Posts"
            description="Latest published content"
            columns={postColumns}
            data={postTableData}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
