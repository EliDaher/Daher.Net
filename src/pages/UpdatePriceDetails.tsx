import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useParams } from "react-router-dom";
import { useDeleteProduct, useProductNameDetails } from "@/hooks/useProducts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "@/services/pos";
import ProductOnline from '@/components/products/ProductOnline';


export default function UpdatePriceDetails() {
  const { id } = useParams();
  const { products = [], isLoading, isError } = useProductNameDetails(id);

  const queryClient = useQueryClient();

  const [formData, setFormData] = useState([]);
    const [isOpen , setIsOpen] = useState(false)

  useEffect(() => {
    if (products) {
      setFormData(products);
    }
  }, [products]);

  const mutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      alert("Product Updated Successfully");
    },
  });

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const updated = [...formData];
    updated[index] = {
      ...updated[index],
      [name]: value,
    };

    setFormData(updated);
  };

  const handleUpdate = (product) => {
    mutation.mutate(product);
  };


  const {mutate , isPending } = useDeleteProduct()
  const handlDelete = async (id)=>{
    console.log(id)
  mutate(
    {id : id},
    {onSuccess : ()=>alert('تم حذف البطاقة بنجاح')}
  )
  }

  if (isLoading) return <p className="p-6">Loading products...</p>;
  if (isError) return <p className="p-6 text-red-500">Error loading products</p>;
  
  return (

    <DashboardLayout>
      <ProductOnline
  isOpen={isOpen}
  setIsOpen={setIsOpen}
  productId={id}
/>      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {formData?.map((product, index) => (
          <Card
            key={product._id}
            className={`w-full overflow-hidden border ${product.border} shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
          >
            <CardHeader>
              <CardTitle>
                <input
                  className="w-full border rounded p-2 text-black"
                  name="title"
                  value={product.title}
                  onChange={(e) => handleChange(index, e)}
                />
              </CardTitle>

              <p className="text-sm text-gray-400">{product.name}</p>
            </CardHeader>

            <CardContent className="space-y-4">

              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover rounded-md"
              />

              <input
                className="w-full border rounded p-2 text-black"
                name="description"
                value={product.description}
                onChange={(e) => handleChange(index, e)}
              />

              <div className="flex gap-4">

                <div className="flex flex-col w-full">
                  <label className="text-xs text-green-600 mb-1">Client Price</label>
                  <input
                    className="border rounded p-2 text-black"
                    name="price"
                    value={product.price}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label className="text-xs text-red-600 mb-1">Web Price</label>
                  <input
                    className="border rounded p-2 text-black"
                    name="priceOnweb"
                    value={product.priceOnweb}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>

              </div>
            </CardContent>

            <CardFooter>
          <div className="flex flex-col w-full gap-1">
                        <button
                onClick={() => handleUpdate(product)}
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
              >
                {mutation.isPending ? "Updating..." : "Update Product"}
              </button>
              <button
                onClick={()=> handlDelete(product._id)}
               className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition">
                {isPending ? 'Deleting...' : 'Delete'}
              </button>
          </div>
            </CardFooter>

          </Card>
        ))}

      </div>
    </DashboardLayout>
  );
}