import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useProducts } from '@/hooks/useProducts';
import {  useNavigate } from 'react-router-dom';

export default function UpdatePrice() {
  const {  products , isLoading , isError ,error } = useProducts();
  const navigate = useNavigate();

  if (isLoading) {
  return <p>Loading products...</p>
}

if (isError) {
  return <p>Error: {error.message}</p>
}

  return (
    <DashboardLayout>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 cursor-pointer">
            {products?.map((product) => (
        <Card key={product.id} className="w-full" onClick={() => navigate(`/UpdatePrice/${product._id}`) } >
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Current type: {product.type}</p>
            {/* Add form or input to update price */}
          </CardContent>
          <CardFooter>
            {/* Add button to submit price update */}
            <p>Current note: {product.note}</p>

          </CardFooter>
        </Card>
      ))}
   
    </div>
    </DashboardLayout>
  )
}
