import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import FormInput from '@/components/ui/custom/FormInput';
import PopupForm from '@/components/ui/custom/PopupForm';
import { useAddType, useProducts } from '@/hooks/useProducts';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UpdatePrice() {
  const { products, isLoading, isError, error } = useProducts();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false)
  const[formData , setFormData] = useState({
    name:'',
    type:'',
    note:'',
  })

  const handelChange = (key , value)=>{
    setFormData({...formData , [key] : value})
  }

  const {mutate , isPending} = useAddType();
  const handleSubmit = (e)=>{
      e.preventDefault();

    mutate(
      {formData},
      {onSuccess: ()=>{
        alert('تم اضافة البطاقة ')
        setIsOpen(false)
      }}
    )
  }
  if (isLoading) {
    return <p>Loading products...</p>
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  return (
    <DashboardLayout>

      <div>
        <PopupForm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          trigger={<Button className='w-full'>اضافة عنصر</Button>}

        >
  <form onSubmit={handleSubmit}  className="space-y-4 p-4">
            <FormInput
              label='اسم العنصر'
              type='text'
              value={formData.name}
              onChange={(e)=> handelChange('name' , e.target.value)}

            />
            <FormInput
              label='نوع العنصر'
              type='text'
              value={formData.type}
              onChange={(e)=> handelChange('type' , e.target.value)}

            />
            <FormInput
              label='ملاحظات '
              type='text'
              value={formData.note}
              onChange={(e)=> handelChange('note' , e.target.value)}

            />

            <Button className='w-full '>{isPending ? 'جاري الاضافة' : 'اضافة عنصر'}</Button>


          </form>
        </PopupForm>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 cursor-pointer">

          {products?.map((product) => (
            <Card key={product.id} className="w-full" onClick={() => navigate(`/UpdatePrice/${product._id}`)} >
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

      </div>
    </DashboardLayout>
  )
}
