import { useCompanies } from "@/hooks/useCompanies";
import { createContext, useContext } from "react";

const CompaniesContext = createContext(null);

export function CompaniesProvider({ children }) {
  const companiesQuery = useCompanies();

  return (
    <CompaniesContext.Provider value={companiesQuery}>
      {children}
    </CompaniesContext.Provider>
  );
}

export function useCompaniesContext() {
  return useContext(CompaniesContext);
}
