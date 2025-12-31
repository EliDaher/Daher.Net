// hooks/useWarehouses.ts
import { getAllCompanies } from "@/services/companies";
import { useQuery } from "@tanstack/react-query";

export function useCompanies() {
  return useQuery({
    queryKey: ["companies-table"],
    queryFn: getAllCompanies,
    staleTime: 1000 * 60 * 30, // 10 minutes (بدون طلبات جديدة قبل انتهاء الوقت)
    refetchOnWindowFocus: false,
  });
}
