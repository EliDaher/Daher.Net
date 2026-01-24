import { DataTable } from "@/components/dashboard/DataTable";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { getInquiryLogs } from "@/services/reports";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export default function InquiryLogs() {
  const queryClient = useQueryClient();
  const socketRef = useRef<Socket | null>(null);

  const { data: logsData } = useQuery({
    queryKey: ["logs-table"],
    queryFn: getInquiryLogs,
  });

  useEffect(() => {
    // أنشئ socket مرة واحدة فقط طوال عمر الصفحة
    socketRef.current = io("http://localhost:5000", {
      transports: ["websocket"],
    });

    socketRef.current.on("createLog", (newLog) => {
      queryClient.setQueryData(["logs-table"], (oldData: any) => {
        if (!oldData) return { logs: [newLog] };

        return {
          logs: [newLog, ...oldData.logs].sort(
            (a, b) => b.timestamp - a.timestamp,
          ),
        };
      });
    });

  }, [queryClient]);

  const sortedLogs =
    logsData?.logs
      ?.slice()
      ?.sort((a: any, b: any) => b.timestamp - a.timestamp) || [];

  const logsColumns = [
    { key: "id", label: "المعرف", sortable: true, hidden: true },
    { key: "from", label: "من", sortable: true },
    { key: "target", label: "الى", sortable: true },
    { key: "message", label: "التفاصيل", sortable: true },
    { key: "date", label: "التاريخ", sortable: true },
    { key: "time", label: "الوقت", sortable: true },
    { key: "type", label: "النوع", sortable: true },
  ];

  return (
    <DashboardLayout>
      <div dir="rtl">
        <DataTable
          title="Logs"
          data={sortedLogs}
          columns={logsColumns}
        />
      </div>
    </DashboardLayout>
  );
}
