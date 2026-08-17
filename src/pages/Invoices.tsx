import { useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import InternetInvoiceTable from "@/components/invoices/InternetInvoiceTable"; 
import ElecTable from "@/components/invoices/ElecTable";
import FinalTableCom from "@/components/invoices/FinalTableCom"; 
import ConfirmInvForm from "@/components/invoices/ConfirmInvForm"; 
import AddBalanceForm from "@/components/invoices/AddBalanceForm"; 
import axios from "axios";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { getEmployeeBalanceTable } from "@/services/balance";
import { Button } from "@/components/ui/button";

const todayDate = new Date().toISOString().split("T")[0];

type InvoiceDetail = {
    id?: string;
    customerDetails?: string;
    customerName?: string;
    customerNumber?: string;
    invoiceNumber?: string;
    invoiceValue?: number | string;
};

type BalanceOperation = {
    _id?: string;
    id?: string;
    amount?: number | string;
    employee?: string;
    timestamp?: string;
    date?: string;
    createdAt?: string;
    details?: InvoiceDetail[] | Record<string, InvoiceDetail> | string;
    invoiceData?: {
        amount?: number | string;
        timestamp?: string;
        details?: InvoiceDetail[] | Record<string, InvoiceDetail> | string;
    };
};

function formatAmount(value: unknown) {
    return Number(value || 0).toLocaleString("en-EG", {
        minimumFractionDigits: 0,
    });
}

function getOperationDetails(operation?: BalanceOperation | null): InvoiceDetail[] {
    const details = operation?.invoiceData?.details ?? operation?.details ?? [];

    if (Array.isArray(details)) {
        return details;
    }

    if (details && typeof details === "object") {
        return Object.values(details);
    }

    return [];
}

function getOperationAmount(operation?: BalanceOperation | null) {
    return Number(operation?.invoiceData?.amount ?? operation?.amount ?? 0);
}

function getOperationTimestamp(operation?: BalanceOperation | null) {
    return String(
        operation?.invoiceData?.timestamp ??
        operation?.timestamp ??
        operation?.createdAt ??
        operation?.date ??
        "-",
    );
}

function formatOperationTimestamp(operation?: BalanceOperation | null) {
    const value = getOperationTimestamp(operation);
    const date = new Date(value);

    return Number.isNaN(date.getTime()) ? value : date.toLocaleString("en-GB");
}

function getOperationDetailsSummary(operation: BalanceOperation) {
    const details = getOperationDetails(operation);

    if (details.length > 0) {
        return details
            .map((detail) =>
                [detail.customerName, detail.customerNumber, detail.invoiceNumber]
                    .filter(Boolean)
                    .join(" / "),
            )
            .filter(Boolean)
            .join("، ");
    }

    return typeof operation.details === "string" && operation.details.trim()
        ? operation.details
        : "لا تفاصيل";
}

function getSortableOperationTime(operation: BalanceOperation) {
    const time = new Date(getOperationTimestamp(operation)).getTime();

    return Number.isNaN(time) ? 0 : time;
}

function Invoice(){
    const queryClient = useQueryClient();
    const [searchText, setSearchText] = useState({PhNumber: ""});
    const [work, setWork] = useState(false);
    const [internetTotal, setInternetTotal] = useState(0);    
    const [elecTotal, setElecTotal] = useState(0);
    const [phoneTotal, setPhoneTotal] = useState(0);
    const [waterTotal, setWaterTotal] = useState(0);
    const [otherTotal, setOtherTotal] = useState(0);
    const [TotalInvoices, setTotalInvoices] = useState(0);
    const [finalTable, setFinalTable] = useState([]);

    const [elecMatchingRows, setElecMatchingRows] = useState(0);
    const [elecOriginalRows, setElecOriginalRows] = useState(0);
    const [internetMatchingRows, setInternetMatchingRows] = useState(0);
    const [internetOriginalRows, setInternetOriginalRows] = useState(0);

    const daherUser = JSON.parse(localStorage.getItem("DaherUser"));

    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => setIsOpen(false);
    const openModalPay = () => setIsOpen(true);  
    const handleFormSubmit = () => {
        closeModal();
        void queryClient.invalidateQueries({
            queryKey: ["invoice-recent-balance-operations"],
        });
    };

    const [payIsOpen, setPayIsOpen] = useState(false);
    const [payOrInv] = useState("pay");
    const closePayModal = () => setPayIsOpen(false);
    const [recentBalanceDate, setRecentBalanceDate] = useState(todayDate);
    const [selectedPrintOperation, setSelectedPrintOperation] =
        useState<BalanceOperation | null>(null);
    const operationPrintRef = useRef<HTMLDivElement>(null);
    
    const handlePayFormSubmit = () => {
      closePayModal();
      void queryClient.invalidateQueries({
        queryKey: ["invoice-recent-balance-operations"],
      });
    }; 

    const [loading, setLoading] = useState(false);

    const {
        data: recentBalanceResponse,
        isLoading: recentOperationsLoading,
        isFetching: recentOperationsFetching,
    } = useQuery({
        queryKey: ["invoice-recent-balance-operations", recentBalanceDate],
        queryFn: () => getEmployeeBalanceTable("all", recentBalanceDate),
    });

    const recentOperations = useMemo<BalanceOperation[]>(() => {
        const rows = Array.isArray(recentBalanceResponse?.data)
            ? recentBalanceResponse.data
            : [];

        return [...rows].sort(
            (first, second) =>
                getSortableOperationTime(second) - getSortableOperationTime(first),
        );
    }, [recentBalanceResponse]);

    const selectedPrintDetails = getOperationDetails(selectedPrintOperation);

    const handlePrintOperation = useReactToPrint({
        contentRef: operationPrintRef,
        pageStyle: `
  @page {
    size: 80mm auto;
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0 !important;
    padding: 0 !important;
    width: 80mm !important;
    max-width: 80mm !important;
    overflow: hidden !important;
    font-family: Arial, sans-serif;
    color: black !important;
    background: white !important;
  }

  @media print {
    body {
      width: 80mm !important;
      max-width: 80mm !important;
      margin: 0 !important;
      padding: 0 !important;
      font-size: 12px;
    }

    .balance-operation-print {
      position: static !important;
      left: auto !important;
      top: auto !important;
      direction: rtl;
      width: 74mm !important;
      max-width: 74mm !important;
      margin: 0 auto !important;
      padding: 3mm 0 4mm !important;
      color: black !important;
      background: white !important;
      font-family: Arial, sans-serif;
      line-height: 1.35;
      overflow: visible !important;
    }

    .balance-operation-header {
      text-align: center;
      font-size: 13px;
      font-weight: 900;
      margin: 0 0 8px 0;
    }

    .balance-operation-header span {
      display: block;
      margin-bottom: 2px;
    }

    .balance-operation-meta {
      border-top: 1px dashed black;
      border-bottom: 1px dashed black;
      padding: 5px 0;
      margin-bottom: 5px;
      font-size: 11px;
      font-weight: 800;
    }

    .balance-operation-meta div,
    .balance-operation-total {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      padding: 2px 0;
    }

    .balance-operation-row {
      break-inside: avoid;
      border-bottom: 1px dashed black;
      padding: 4px 0;
      font-size: 10.5px;
      font-weight: 700;
    }

    .balance-operation-customer {
      display: flex;
      justify-content: space-between;
      gap: 5px;
      margin-bottom: 2px;
      font-weight: 900;
    }

    .balance-operation-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 16mm 18mm;
      gap: 3px;
    }

    .balance-operation-row span,
    .balance-operation-meta span {
      min-width: 0;
      word-break: break-word;
      overflow-wrap: anywhere;
    }

    .balance-operation-cycle,
    .balance-operation-amount {
      text-align: left;
      white-space: nowrap;
    }

    .balance-operation-amount {
      font-weight: 900;
    }

    .balance-operation-total {
      border-top: 2px solid black;
      margin-top: 8px;
      padding-top: 7px;
      font-weight: 900;
      font-size: 19px;
    }
  }
`,
        onAfterPrint: () => setSelectedPrintOperation(null),
    });

    const printOperation = (operation: BalanceOperation) => {
        flushSync(() => {
            setSelectedPrintOperation(operation);
        });
        handlePrintOperation();
    };


    const clearAllTables = () => {
        setInternetTotal(0)
        setElecTotal(0)
        setWaterTotal(0)
        setPhoneTotal(0)
        setOtherTotal(0)
        setFinalTable([])
        setElecOriginalRows([] as any)
        setElecMatchingRows([] as any)
        setInternetOriginalRows([] as any)
        setInternetMatchingRows([] as any)
    }


    const searchForRows = async () => {
        if (!searchText?.PhNumber) return;

        setLoading(true)

        try {
            const response = await axios.post("https://server-uvnz.onrender.com/search", searchText );

            setElecOriginalRows(response.data.elecOriginalRows)
            setElecMatchingRows(response.data.elecMatchingRows)
            setInternetOriginalRows(response.data.internetOriginalRows)
            setInternetMatchingRows(response.data.internetMatchingRows)
            
        } catch (err) {
            console.error(err);
            //setError("حدث خطأ أثناء البحث.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        setTotalInvoices(Number(internetTotal)+Number(elecTotal)+Number(phoneTotal)+Number(waterTotal)+Number(otherTotal))
    }, [internetTotal, elecTotal, phoneTotal, waterTotal, otherTotal])

    return<>
        <DashboardLayout>
            <div className="space-y-6">

                <div className="flex-col w-full">
                    <div className="sticky top-0 z-30 py-3 shadow bg-foreground/10 flex flex-wrap justify-center mt-4 select-none">
                        <div className="flex shadow-[0px_0px_4px] shadow-accent-400 mr-5 rounded-lg text-text-950">
                            <button 
                                onClick={()=>{
                                    openModalPay()
                                    if(finalTable.length > 0){
                                    }
                                }}
                                className="text-center text-lg p-2 border-r rounded-l-lg border-text-950 bg-accent-200 hover:bg-accent-300 text-accent-foreground font-bold">
                                انهاء
                            </button>
                            <div className="text-center text-xl p-2 rounded-r-lg">
                                {TotalInvoices}
                            </div>
                        </div>
                        <input
                          type="text"
                          placeholder="بحث برقم الهاتف"
                          className="p-2 rounded-l-lg w-60 text-center bg-background text-text-900 shadow-md outline-none border border-primary-500"
                          value={searchText.PhNumber}
                          onChange={(e) => {
                            setSearchText({PhNumber: e.target.value});
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault(); // منع الإرسال التلقائي
                              setWork(true);
                              searchForRows();
                              clearAllTables();
                            }
                          }}
                        />
                        <button 
                            onClick={()=>{
                                setWork(true)
                                searchForRows()
                                clearAllTables()
                            }}
                            className="p-2 rounded-r-lg bg-primary-500 text-white font-bold"
                        >بحث</button>
                    </div>
                    <div className="bg-foreground/5 p-1">

                    <InternetInvoiceTable 
                        loading={loading}
                        internetOriginalRows={internetOriginalRows}
                        internetMatchingRows={internetMatchingRows}
                        finalTable={finalTable} 
                        setFinalTable={setFinalTable} 
                        searchText={searchText} 
                        work={work} 
                        setWork={setWork} 
                        internetTotal={internetTotal} 
                        setInternetTotal={setInternetTotal}
                        />

                    <ElecTable 
                        loading={loading}
                        elecOriginalRows={elecOriginalRows}
                        elecMatchingRows={elecMatchingRows}
                        finalTable={finalTable} 
                        setFinalTable={setFinalTable} 
                        searchText={searchText} 
                        work={work} 
                        setWork={setWork} 
                        elecTotal={elecTotal} 
                        setElecTotal={setElecTotal}
                        phoneTotal={phoneTotal} 
                        setPhoneTotal={setPhoneTotal} 
                        waterTotal={waterTotal} 
                        setWaterTotal={setWaterTotal}
                        otherTotal={otherTotal}
                        setOtherTotal={setOtherTotal}
                        />

                    </div>
                    <div className="w-80 m-auto rounded-lg px-6 py-3">
                        <FinalTableCom finalTable={finalTable}></FinalTableCom>
                    </div>
                    <ConfirmInvForm
                        setTotalInvoices={setTotalInvoices}
                        clearAllTables={clearAllTables}
                        TotalInvoices={TotalInvoices}
                        finalTable={finalTable}
                        isOpen={isOpen}
                        onClose={closeModal}
                        onSubmit={handleFormSubmit}
                        categoryTotals={{
                            internetTotal,
                            elecTotal,
                            waterTotal,
                            phoneTotal,
                            otherTotal,
                        }}
                    />
                </div>

                <section className="rounded-lg border bg-background shadow-sm" dir="rtl">
                    <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-foreground">
                                آخر العمليات المضافة إلى الرصيد
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {recentBalanceDate} - {daherUser.role === 'admin' ? recentOperations.length : recentOperations.filter(operation => operation.employee === daherUser.username).length} عملية
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <label
                                className="text-sm font-medium text-muted-foreground"
                                htmlFor="recentBalanceDate"
                            >
                                التاريخ
                            </label>
                            <input
                                className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                                id="recentBalanceDate"
                                onChange={(event) =>
                                    setRecentBalanceDate(event.target.value)
                                }
                                type="date"
                                value={recentBalanceDate}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-[760px] w-full text-sm text-foreground">
                            <thead>
                                <tr className="bg-foreground/10 text-right">
                                    <th className="px-4 py-3">#</th>
                                    <th className="px-4 py-3">الموظف</th>
                                    <th className="px-4 py-3">التفاصيل</th>
                                    <th className="px-4 py-3">المبلغ</th>
                                    <th className="px-4 py-3">التاريخ</th>
                                    <th className="px-4 py-3 text-center">الطباعة</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOperationsLoading ? (
                                    <tr>
                                        <td
                                            className="px-4 py-8 text-center text-muted-foreground"
                                            colSpan={6}
                                        >
                                            جاري التحميل...
                                        </td>
                                    </tr>
                                ) : recentOperations.length > 0 ? (
                                    (
                                      daherUser.role !== 'admin'
                                        ? recentOperations.filter(
                                            operation => operation.employee === daherUser.username
                                          )
                                        : recentOperations
                                    ).map((operation, index) => (
                                    <tr
                                            className="border-t transition hover:bg-foreground/5"
                                            key={operation._id ?? operation.id ?? index}
                                        >
                                            <td className="px-4 py-3">{index + 1}</td>
                                            <td className="px-4 py-3 font-medium">
                                                {operation.employee || "غير محدد"}
                                            </td>
                                            <td className="max-w-[420px] px-4 py-3">
                                                <span
                                                    className="line-clamp-2"
                                                    title={getOperationDetailsSummary(operation)}
                                                >
                                                    {getOperationDetailsSummary(operation)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 font-bold text-primary">
                                                {formatAmount(getOperationAmount(operation))}
                                            </td>
                                            <td className="px-4 py-3 text-muted-foreground">
                                                {formatOperationTimestamp(operation)}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex justify-center">
                                                    <Button
                                                        disabled={recentOperationsFetching}
                                                        onClick={() => printOperation(operation)}
                                                        size="sm"
                                                        type="button"
                                                        variant="outline"
                                                    >
                                                        <Printer className="h-4 w-4" />
                                                        طباعة
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            className="px-4 py-8 text-center text-muted-foreground"
                                            colSpan={6}
                                        >
                                            لا توجد عمليات
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                <div
                    ref={operationPrintRef}
                    className="balance-operation-print fixed left-[-10000px] top-0 bg-white text-gray-950"
                    dir="rtl"
                >
                    <div className="balance-operation-header">
                        <span>Daher.Net</span>
                        <span>{formatOperationTimestamp(selectedPrintOperation)}</span>
                    </div>

                    <div className="balance-operation-meta">
                        <div>
                            <span>الموظف</span>
                            <span>{selectedPrintOperation?.employee || "غير محدد"}</span>
                        </div>
                    </div>

                    {selectedPrintDetails.length > 0 ? (
                        selectedPrintDetails.map((detail, index) => (
                            <div
                                className="balance-operation-row"
                                key={`${detail.id || detail.invoiceNumber || "detail"}-${index}`}
                            >
                                <div className="balance-operation-customer">
                                    <span>{detail.customerName || "-"}</span>
                                    <span>{detail.customerNumber || "-"}</span>
                                </div>
                                <div className="balance-operation-grid">
                                    <span>{detail.customerDetails || "-"}</span>
                                    <span className="balance-operation-cycle">
                                        {detail.invoiceNumber || "-"}
                                    </span>
                                    <span className="balance-operation-amount">
                                        {formatAmount(detail.invoiceValue)}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="balance-operation-row">
                            {selectedPrintOperation
                                ? getOperationDetailsSummary(selectedPrintOperation)
                                : "لا تفاصيل"}
                        </div>
                    )}

                    <div className="balance-operation-total">
                        <span>المجموع</span>
                        <span>{formatAmount(getOperationAmount(selectedPrintOperation))}</span>
                    </div>
                </div>
            
            </div>
        </DashboardLayout>
        <AddBalanceForm payOrInv={payOrInv} isOpen={payIsOpen} onClose={closePayModal} onSubmit={handlePayFormSubmit} />
    </>
}

export default Invoice;
