// hooks/useCompanies.ts
import { getAllCompanies } from "@/services/companies";
import { useQuery } from "@tanstack/react-query";

export function useCompanies() {
  const query = useQuery({
    queryKey: ["companies-table"],
    queryFn: getAllCompanies,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    select: (data) => {
      // في حال رجعت null أو undefined
      if (!data) return [];

      // في حال رجعت ليستة فاضية
      if (Array.isArray(data) && data.length === 0) return [];

      return data;
    },
  });

  return {
    ...query,
    companies: query.data ?? [],
    isEmpty: !query.isLoading && (query.data?.length ?? 0) === 0,
  };
}
