import { DashboardLayout } from '@/components/layout/DashboardLayout'
import React from 'react'
import { Input } from '@/components/ui/input'
import axios from 'axios';
import { useState  } from 'react'

export default function AddProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const[stock , setStock]=useState(0);
    const [description, setDescription] = useState('');
        const [message, setMessage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
        const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        if (!name || !price || !imageUrl) {
            setMessage({ type: 'error', text: 'الرجاء تعبئة الاسم والسعر وإضافة رابط الصورة.' });
            return;
        }

        const productData = {
            name,
            price,
            category,
            description,
            imageUrl,
            stock
        };

        try {
            setUploading(true);

            const apiBase = "https://paynet-1.onrender.com";

            const res = await axios.post(
                `${apiBase}/api/product/add`,
                productData
            );

            setMessage({ type: 'success', text: 'تم رفع المنتج بنجاح!' });

            // reset form
            setName('');
            setPrice(0);
            setCategory('');
            setDescription('');
            setImageUrl('');
            setStock(0);

        } catch (err) {
            console.error(err);
            const errMsg = err?.response?.data?.message || err.message || 'حصل خطأ أثناء الرفع';
            setMessage({ type: 'error', text: errMsg });
        } finally {
            setUploading(false);
        }
    };

  return (
    <DashboardLayout>
        <div>
            <form action="" onSubmit={handleSubmit} className='flex flex-col'>
                <label htmlFor="">
                    Product Name:
                    <Input 
                    type="text"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    className='mt-2 mb-4'/>
                </label>
                <label htmlFor="">
                    Product Price:
                    <Input
                     type="number"
                        value={price}
                        onChange={(e)=>setPrice(Number(e.target.value))}
                     className='mt-2 mb-4'/>
                </label>
                <label htmlFor="">
                    Product Category:
                    <Input 
                     type="text"
                        value={category}
                        onChange={(e)=>setCategory(e.target.value)}
                     className='mt-2 mb-4'/>
                </label>
                <label htmlFor="">
                    Stock:
                    <Input 
                     type="number"
                        value={stock}
                        onChange={(e)=>setStock(Number(e.target.value))}
                     className='mt-2 mb-4'/>
                </label>
                <label htmlFor="">
                    Description:
                    <Input 
                     type="text"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                     className='mt-2 mb-4'/>
                </label>
                <label htmlFor="">
                    Image URL:
                    <Input 
                     type="text"
                        value={imageUrl}
                        onChange={(e)=>setImageUrl(e.target.value)}
                     className='mt-2 mb-4'/>
                </label>
                <button
                 type="submit"
                 disabled={uploading}
                    className='bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50'
                >
                    {uploading ? 'Uploading...' : 'Add Product'}
                </button>
                {message && (
                    <p className={`mt-4 ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                        {message.text}
                    </p>
                )}
            </form>

        </div>

    </DashboardLayout>
  )
}
