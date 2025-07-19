import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { getEmployeeBalanceTable } from '@/services/balance'
import { useEffect, useState, useCallback } from 'react'

import * as Select from '@radix-ui/react-select'
import * as Popover from '@radix-ui/react-popover'
import { ChevronDownIcon } from 'lucide-react' 

type BalanceItem = {
  id: string
  amount: number
  details: string | string[]
  employee?: string
  timestamp?: string
  // أي حقول إضافية...
}

export default function MyBalance() {
  const daherUser = JSON.parse(localStorage.getItem('DaherUser') || '{}');

  // ----------------------------------
  // حالات
  // ----------------------------------
  const [username, setUsername] = useState<string>(daherUser.username || 'elidaher');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]); // YYYY-MM-DD

  const [data, setData] = useState<BalanceItem[]>([]);
  const [employees, setEmployees] = useState<string[]>(['all']); // سيتم تحديثها ديناميكياً
  const [loading, setLoading] = useState(false);
  const [loadingEmployees, setLoadingEmployees] = useState(false);

  // ----------------------------------
  // جلب قائمة الموظفين (اعتماداً على التاريخ)
  // ----------------------------------
  const loadEmployees = useCallback(async (targetDate: string) => {
    setLoadingEmployees(true);
    try {
      const res = await getEmployeeBalanceTable('all', targetDate);
      const rows: BalanceItem[] = Array.isArray(res?.data) ? res.data : [];

      // استخراج أسماء الموظفين الفريدة
      const names = Array.from(
        new Set(
          rows
            .map((r) => r.employee)
            .filter((v): v is string => typeof v === 'string' && v.trim() !== '')
        )
      );

      // ضم 'all' كبداية القائمة
      const finalList = ['all', ...names];

      setEmployees(finalList);

      // إذا كان الـ username الحالي غير موجود في القائمة الجديدة، اختَر أول اسم بعد all (أو احتفظ بالحالي)
      if (!finalList.includes(username)) {
        if (names.length > 0) {
          setUsername(names[0]); // أول موظف متاح
        } else {
          setUsername('all');
        }
      }
    } catch (err) {
      console.error('Failed to load employees:', err);
      // نُبقي القائمة الحالية
    } finally {
      setLoadingEmployees(false);
    }
  }, [username]);

  // ----------------------------------
  // جلب بيانات البيان المالي لموظف/جميع الموظفين
  // ----------------------------------
  const loadBalanceData = useCallback(async (user: string, targetDate: string) => {
    setLoading(true);
    try {
      const res = await getEmployeeBalanceTable(user, targetDate);
      const rows: BalanceItem[] = Array.isArray(res?.data) ? res.data : [];

      // لو طلبنا موظف واحد، قد لا يرجع الحقل employee من السيرفر؛ نضيفه يدويًا
      const normalized = rows.map((item) => ({
        ...item,
        employee: item.employee ?? (user !== 'all' ? user : undefined),
        amount: Number(item.amount) || 0,
      }));

      setData(normalized);
    } catch (err) {
      console.error(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ----------------------------------
  // عند تغيير التاريخ: حمّل قائمة الموظفين ثم البيانات
  // ----------------------------------
  useEffect(() => {
    // نجلب أولاً الموظفين (all) بناءً على التاريخ
    loadEmployees(date);
  }, [date, loadEmployees]);

  // ----------------------------------
  // عند تغيير (username أو date)، اجلب البيانات
  // (سيعمل أيضاً بعد أن يكتمل loadEmployees ويضبط username إذا تغيّر)
  // ----------------------------------
  useEffect(() => {
    loadBalanceData(username, date);
    console.log(data)
  }, [username, date, loadBalanceData]);

  // ----------------------------------
  // الإجمالي
  // ----------------------------------
  const totalAmount = data.reduce((sum, item) => sum + (item.amount || 0), 0);

  // ----------------------------------
  // JSX
  // ----------------------------------
  return (
    <DashboardLayout>
      <div dir='rtl' className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold text-foreground">البيان المالي</h1>

          <div className="flex gap-4">
            {/* Date Picker */}
            <Popover.Root>
              <Popover.Trigger asChild>
                <button
                  className="border border-gray-300 rounded-lg px-4 py-2 text-foreground flex items-center gap-2 hover:bg-foreground/30"
                  aria-label="اختر التاريخ"
                >
                  {date}
                  <ChevronDownIcon className="w-4 h-4" />
                </button>
              </Popover.Trigger>
              <Popover.Content
                sideOffset={8}
                className="bg-background shadow-lg rounded-lg p-4 border border-gray-200"
              >
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-background"
                />
              </Popover.Content>
            </Popover.Root>

            {/* Select Employee (ديناميكي) */}
            { daherUser.role == 'admin' &&
            <Select.Root
              value={username}
              onValueChange={(value) => setUsername(value)}
              disabled={loadingEmployees}
            >
              <Select.Trigger
                className="border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-between gap-2 w-40 disabled:opacity-50 hover:bg-foreground/30"
                aria-label="اختر الموظف"
              >
                <Select.Value placeholder={loadingEmployees ? '...' : 'اختر الموظف'} />
                <Select.Icon>
                  <ChevronDownIcon className="w-4 h-4" />
                </Select.Icon>
              </Select.Trigger>
               <Select.Content className="bg-background border border-gray-200 rounded-lg shadow-md max-h-56 overflow-y-auto">
                <Select.Viewport>
                  {employees.map((emp) => (
                    <Select.Item
                      key={emp}
                      value={emp}
                      className="px-4 py-2 hover:bg-foreground/30 cursor-pointer"
                    >
                      <Select.ItemText>
                        {emp === 'all' ? 'جميع الموظفين' : emp}
                      </Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Root>}
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-background rounded-xl shadow-md overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center text-foreground">جاري التحميل...</div>
          ) : data.length === 0 ? (
            <div className="p-6 text-center text-foreground">لا توجد بيانات</div>
          ) : (
            <table className="min-w-full text-sm text-foreground">
              <thead>
                <tr className="bg-foreground/20 text-foreground text-right">
                  <th className="py-3 px-4">#</th>
                  {username === 'all' && <th className="py-3 px-4">الموظف</th>}
                  <th className="py-3 px-4">التفاصيل</th>
                  <th className="py-3 px-4">المبلغ</th>
                  <th className="py-3 px-4">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-foreground/20 transition"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    {username === 'all' && <th className="py-3 px-4">{item.employee}</th>}
                    <td className="py-3 px-4">
                      {Array.isArray(item.details) && item.details.length > 0 ? (
                        <Popover.Root>
                          <Popover.Trigger asChild>
                            <button className="text-foreground hover:underline">{
                                item.details.map((d: any)=>{
                                    return <p>{d.customerName + " // " + d.customerNumber }</p>
                                })    
                            }</button>
                          </Popover.Trigger>
                          <Popover.Content
                            side="bottom"
                            align="start"
                            className="bg-background border border-gray-200 rounded-lg shadow-lg p-4 max-w-lg"
                          >
                            <table className="text-sm w-full border-collapse">
                              <thead>
                                <tr className="bg-foreground/30 text-foreground">
                                  <th className="border px-2 py-1">العميل</th>
                                  <th className="border px-2 py-1">الهاتف</th>
                                  <th className="border px-2 py-1">رقم الفاتورة</th>
                                  <th className="border px-2 py-1">القيمة</th>
                                  <th className="border px-2 py-1">ملاحظات</th>
                                </tr>
                              </thead>
                              <tbody>
                                {item.details.map((d: any, idx) => (
                                  <tr key={idx}>
                                    <td className="border px-2 py-1">{d.customerName}</td>
                                    <td className="border px-2 py-1">{d.customerNumber}</td>
                                    <td className="border px-2 py-1">{d.invoiceNumber}</td>
                                    <td className="border px-2 py-1">{d.invoiceValue}</td>
                                    <td className="border px-2 py-1">{d.customerDetails}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </Popover.Content>
                        </Popover.Root>
                      ) : (
                        <span className="text-gray-400">لا تفاصيل</span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-blue-600 dark:text-primary-300 font-semibold">{item.amount}</td>
                    <td className="py-3 px-4">{item.timestamp}</td>
                  </tr>
                  
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* الإجمالي */}
        {!loading && data.length > 0 && (
          <div className="flex justify-end">
            <div className="bg-foreground/10 px-6 py-3 rounded-lg text-blue-700 dark:text-primary-300 font-bold shadow dark:shadow-lg dark:shadow-white/15">
              الإجمالي: {totalAmount}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
