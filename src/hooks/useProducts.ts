import { productName, productNameDetails , addProduct, deleteProductOnline, addtype, addType } from "@/services/pos";
import { useQuery } from "@tanstack/react-query";  
import { useMutation } from "@tanstack/react-query";
import { object, string } from "zod";


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
export const useAddProduct = ()=>{
    return useMutation({
        mutationFn:({id , formData} : {id : string , formData   : object})=>
            addProduct(formData , id)
    })
}

export const useDeleteProduct =()=>{
    return useMutation({
        mutationFn: ({id} : { id : string})=>
            deleteProductOnline(id)
    })
}

export const useAddType =()=>{
    return useMutation({
        mutationFn : ({formData} : {formData : object})=>
            addType(formData)
    })
}