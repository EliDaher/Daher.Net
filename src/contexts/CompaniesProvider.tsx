import { useCompanies } from "@/hooks/useCompanies";
import { createContext, useContext, type ReactNode } from "react";

type CompaniesQuery = ReturnType<typeof useCompanies>;

const CompaniesContext = createContext<CompaniesQuery | null>(null);

export function CompaniesProvider({ children }: { children: ReactNode }) {
  const companiesQuery = useCompanies();

  return (
    <CompaniesContext.Provider value={companiesQuery}>
      {children}
    </CompaniesContext.Provider>
  );
}

export function useCompaniesContext() {
  const context = useContext(CompaniesContext);

  if (!context) {
    throw new Error("useCompaniesContext must be used within CompaniesProvider");
  }

  return context;
}
