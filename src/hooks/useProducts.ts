import { productName, productNameDetails } from "@/services/pos";
import { useQuery } from "@tanstack/react-query";   

export const useProducts =()=>{
    const query = useQuery({
        queryKey:['products'],
        queryFn:productName,
        select: (data)=> data?.productName ||[],
        staleTime : 1000*60*5,

    })
    return{
    products: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    }
}

export const useProductNameDetails = (id : string)=>{
    const query = useQuery({
        queryKey : ['products' , id],
        queryFn :()=> productNameDetails(id),
        staleTime:1000*60*5,
            enabled: !!id,

    })
    return{
        products:query.data || [],
        isLoading:query.isLoading,
        isError: query.isError,
    }
}

