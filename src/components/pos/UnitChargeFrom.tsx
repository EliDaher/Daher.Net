import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";
import apiClient from "@/lib/axios";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import PopupForm from "../ui/custom/PopupForm";

// API Key مكشوف في المتصفح - للاختبار فقط
const API_KEY = "YOUR_API_KEY_HERE";

const BALANCE_API_URL = "https://apisyria.com/api/v1";

type CashAccount = {
  id: string;
  name: string;
  gsm: string;
  pin_code: string;
};

const CASH_ACCOUNTS: CashAccount[] = [
  {
    id: "1",
    name: "حساب سيريتل كاش الأول",
    gsm: "0997362954",
    pin_code: "0000",
  },
  {
    id: "2",
    name: "حساب سيريتل كاش الثاني",
    gsm: "0993181151",
    pin_code: "0000",
  },
];

const CATEGORIES = [
  "1.92",
  "2.88",
  "3.84",
  "4.80",
  "5.76",
  "9.61",
  "20.19",
  "23.07",
  "24.03",
  "25.96",
  "30.76",
  "40.38",
  "45.19",
  "48.07",
  "52.88",
  "62.5",
  "68.26",
  "72.11",
  "77.88",
  "81.73",
  "86.53",
  "96.15",
  "100.96",
  "105.76",
  "115.38",
  "125",
  "125.00",
  "130.76",
  "144.23",
  "160.57",
  "163.46",
  "173.07",
  "183.65",
  "192.30",
  "211.53",
  "240.38",
  "288.46",
  "317.30",
  "370.19",
  "432.69",
  "480.76",
  "576.92",
  "625",
  "625.00",
  "721.15",
  "769.23",
  "951.92",
  "1057.69",
  "1250",
  "1250.00",
  "1923.07",
  "2115.38",
  "2403.84",
  "3846.15",
];

type BalanceResponse = {
  success: boolean;
  data?: {
    gsm: string;
    cash_code: string;
    balance: string;
    merchant_balance: string;
  };
  message?: string;
};

type RechargeData = {
  source_account?: {
    gsm?: string;
    cash_code?: string;
  };
  target_gsm?: string;
  selected_category?: string;
  sent_amount?: string;
  recharge_amount?: string;
  fee_amount?: string;
  tax?: string;
  message?: string;
};

type RechargeResponse = {
  success: boolean;
  data?: RechargeData;
  message?: string;
  error?: string;
  unknown?: boolean;
};

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

type Step = "form" | "confirm" | "result" | "unknown";

const UnitChargeFrom = ({ isOpen, setIsOpen }: Props) => {
  const [accountId, setAccountId] = useState("");
  const [targetGsm, setTargetGsm] = useState("");
  const [category, setCategory] = useState("");

  const [step, setStep] = useState<Step>("form");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RechargeData | null>(null);

  const [balance, setBalance] = useState<string | null>(null);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [balanceError, setBalanceError] = useState(false);

  const submittingRef = useRef(false);
  const balanceRequestRef = useRef(0);

  const selectedAccount = CASH_ACCOUNTS.find(
    (account) => account.id === accountId,
  );

  const normalizedTarget = targetGsm.trim().replace(/[\s-]/g, "");

  // جلب الرصيد مباشرة من API Syria

  const fetchBalance = async (gsm: string) => {
    const requestId = ++balanceRequestRef.current;

    setBalance(null);
    setBalanceError(false);
    setBalanceLoading(true);

    try {
      const response = await apiClient.get<BalanceResponse>(
        "/api/syriatel/balance",
        {
          params: { gsm },
          timeout: 15000,
        },
      );

      if (requestId !== balanceRequestRef.current) {
        return;
      }

      if (
        response.data.success !== true ||
        response.data.data?.balance == null
      ) {
        throw new Error("تعذر جلب الرصيد");
      }

      setBalance(response.data.data.balance);
      setBalanceError(false);
    } catch (error) {
      if (requestId !== balanceRequestRef.current) {
        return;
      }

      console.error("Balance request failed", {
        status: axios.isAxiosError(error) ? error.response?.status : undefined,
      });

      setBalance(null);
      setBalanceError(true);
    } finally {
      if (requestId === balanceRequestRef.current) {
        setBalanceLoading(false);
      }
    }
  };

  // جلب الرصيد عند اختيار حساب أو فتح النافذة
  useEffect(() => {
    if (!isOpen || !selectedAccount) {
      ++balanceRequestRef.current;
      setBalance(null);
      setBalanceLoading(false);
      setBalanceError(false);
      return;
    }

    void fetchBalance(selectedAccount.gsm);

    return () => {
      ++balanceRequestRef.current;
    };
  }, [isOpen, accountId]);

  const validate = () => {
    if (!selectedAccount) {
      toast.error("يرجى اختيار حساب سيريتل كاش");
      return false;
    }

    if (!/^09\d{8}$/.test(normalizedTarget)) {
      toast.error("يرجى إدخال رقم موبايل صحيح من 10 أرقام");
      return false;
    }

    if (!CATEGORIES.includes(category)) {
      toast.error("يرجى اختيار فئة شحن صحيحة");
      return false;
    }

    return true;
  };

  const resetForm = () => {
    ++balanceRequestRef.current;
    setAccountId("");
    setTargetGsm("");
    setCategory("");
    setResult(null);
    setBalance(null);
    setBalanceError(false);
    setBalanceLoading(false);
    setStep("form");
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && (loading || submittingRef.current)) {
      return;
    }

    if (!open && step !== "unknown") {
      resetForm();
    }

    setIsOpen(open);
  };

  const handleRecharge = async () => {
    if (submittingRef.current || loading) return;
    if (!validate() || !selectedAccount) return;

    submittingRef.current = true;
    setLoading(true);
    setResult(null);

    try {
      const response = await apiClient.post<RechargeResponse>(
        "/api/syriatel/recharge",
        {
          accountId,
          gsm: selectedAccount.gsm,
          pin_code: selectedAccount.pin_code,
          target_gsm: normalizedTarget,
          category,
        },
      );

      if (response.data.success !== true) {
        toast.error(
          response.data.message ||
            response.data.error ||
            "رفض مزود الخدمة عملية الشحن",
        );
        return;
      }

      setResult(response.data.data ?? {});
      setStep("result");

      toast.success(response.data.data?.message || "تم شحن الرصيد بنجاح");

      // تحديث الرصيد بعد الشحن
      void fetchBalance(selectedAccount.gsm);
    } catch (error) {
      const data = axios.isAxiosError(error)
        ? (error.response?.data as Partial<RechargeResponse> | undefined)
        : undefined;

      if ((axios.isAxiosError(error) && !error.response) || data?.unknown) {
        setStep("unknown");

        toast.warning(
          "نتيجة العملية غير معروفة. تحقق من سجل المزود قبل إعادة الشحن.",
        );
      } else if (axios.isAxiosError(error)) {
        toast.error(data?.message || data?.error || "فشل طلب الشحن");
      } else {
        toast.error(
          error instanceof Error ? error.message : "حدث خطأ غير متوقع",
        );
      }
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  };

  return (
    <PopupForm
      isOpen={isOpen}
      setIsOpen={handleOpenChange}
      trigger={<Button disabled={loading}>تعبئة وحدات</Button>}
      title="تحويل رصيد سيريتل"
    >
      <div dir="rtl" className="space-y-5 py-2">
        {step === "form" && (
          <>
            <div className="space-y-2">
              <Label>حساب سيريتل كاش المصدر</Label>

              <div className="flex items-center gap-2">
                <div className="min-w-0 flex-1">
                  <Select
                    value={accountId}
                    onValueChange={setAccountId}
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر حساب سيريتل كاش" />
                    </SelectTrigger>

                    <SelectContent>
                      {CASH_ACCOUNTS.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.name} - {account.gsm}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex shrink-0 items-center gap-1 rounded-md border px-2 py-2">
                  {balanceLoading ? (
                    <span className="text-xs text-muted-foreground">
                      جارٍ التحميل...
                    </span>
                  ) : balanceError ? (
                    <span className="text-xs text-red-500">خطأ في الرصيد</span>
                  ) : balance !== null ? (
                    <span className="text-sm font-semibold text-green-600">
                      {balance}
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}

                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6"
                    disabled={!selectedAccount || balanceLoading}
                    onClick={() => {
                      if (selectedAccount) {
                        void fetchBalance(selectedAccount.gsm);
                      }
                    }}
                    title="تحديث الرصيد"
                  >
                    <RefreshCw
                      className={`h-3.5 w-3.5 ${
                        balanceLoading ? "animate-spin" : ""
                      }`}
                    />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>رقم الموبايل المراد شحنه</Label>

              <Input
                type="tel"
                inputMode="numeric"
                dir="ltr"
                placeholder="09xxxxxxxx"
                value={targetGsm}
                onChange={(event) => setTargetGsm(event.target.value)}
                disabled={loading}
                maxLength={15}
              />
            </div>

            <div className="space-y-2">
              <Label>فئة الشحن</Label>

              <Select
                value={category}
                onValueChange={setCategory}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر فئة الشحن" />
                </SelectTrigger>

                <SelectContent className="max-h-72">
                  {CATEGORIES.map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="button"
              className="w-full"
              disabled={loading}
              onClick={() => {
                if (validate()) {
                  setStep("confirm");
                }
              }}
            >
              متابعة الشحن
            </Button>
          </>
        )}

        {step === "confirm" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">تأكيد عملية الشحن</h3>

            <p className="text-sm text-muted-foreground">
              يرجى التأكد من البيانات قبل تنفيذ عملية الشحن.
            </p>

            <div className="space-y-3 rounded-lg border p-4 text-sm">
              <div>
                <span className="text-muted-foreground">الحساب المصدر:</span>
                <p className="font-medium">{selectedAccount?.name}</p>
                <p dir="ltr" className="text-right">
                  {selectedAccount?.gsm}
                </p>
              </div>

              <div>
                <span className="text-muted-foreground">رقم المستفيد:</span>
                <p dir="ltr" className="text-right font-medium">
                  {normalizedTarget}
                </p>
              </div>

              <div>
                <span className="text-muted-foreground">فئة الشحن:</span>
                <p className="font-semibold">{category}</p>
              </div>

              {balance !== null && (
                <div>
                  <span className="text-muted-foreground">
                    الرصيد الحالي للحساب:
                  </span>
                  <p className="font-semibold text-green-600">{balance}</p>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                disabled={loading}
                onClick={() => setStep("form")}
              >
                رجوع
              </Button>

              <Button
                type="button"
                className="flex-1"
                disabled={loading}
                onClick={() => {
                  void handleRecharge();
                }}
              >
                {loading ? "جارٍ تنفيذ الشحن..." : "تأكيد الشحن"}
              </Button>
            </div>
          </div>
        )}

        {step === "result" && result && (
          <div className="space-y-4">
            <h3 className="font-semibold text-green-600">تم الشحن بنجاح</h3>

            <div className="space-y-3 rounded-lg border p-4 text-sm">
              <p>
                الحساب المصدر:{" "}
                {result.source_account?.gsm ?? selectedAccount?.gsm}
              </p>

              <p>رقم المستفيد: {result.target_gsm ?? normalizedTarget}</p>

              <p>الفئة المختارة: {result.selected_category ?? category}</p>

              <p>المبلغ المرسل: {result.sent_amount ?? "-"}</p>

              <p>الرصيد المشحون: {result.recharge_amount ?? "-"}</p>

              <p>الرسوم: {result.fee_amount ?? "-"}</p>

              <p>الضريبة: {result.tax ?? "-"}</p>

              {result.message && (
                <p className="font-medium">{result.message}</p>
              )}
            </div>

            <Button
              type="button"
              className="w-full"
              onClick={() => {
                resetForm();
                setIsOpen(false);
              }}
            >
              إغلاق
            </Button>
          </div>
        )}

        {step === "unknown" && (
          <div className="space-y-4">
            <h3 className="font-semibold text-amber-600">
              تعذر تحديد نتيجة الشحن
            </h3>

            <p className="text-sm">
              انقطع الاتصال أو انتهت مهلة الطلب. قد تكون العملية نُفذت بالفعل.
              تحقق من سجل عمليات Syriatel Cash قبل محاولة الشحن مرة أخرى.
            </p>

            <div className="rounded-lg border p-3 text-sm">
              <p>رقم المستفيد: {normalizedTarget}</p>
              <p>فئة الشحن: {category}</p>
              <p>الحساب المصدر: {selectedAccount?.gsm}</p>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              إغلاق دون إعادة الشحن
            </Button>
          </div>
        )}
      </div>
    </PopupForm>
  );
};

export default UnitChargeFrom;
