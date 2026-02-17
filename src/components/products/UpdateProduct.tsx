import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function UpdateProduct({ product, onClose, onUpdated }) {
  const [formData, setFormData] = useState({
    name: product.name || "",
    price: product.price || "",
    priceCost: product.priceCost || "",
    priceWolesale: product.priceWolesale || "",
    category: product.category || "",
    stock: product.stock || "",
    description: product.description || "",
    imageUrl: product.imageUrl || "",
  });

  const [loading, setLoading] = useState(false);
  const apiBase = "https://paynet-1.onrender.com";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(
        `${apiBase}/api/product/update-product/${product._id}`,
        formData
      );
      onUpdated(res.data);
    } catch (err) {
      toast.error(err?.response?.data?.message || "حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-full max-w-xl rounded-xl p-6 relative">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          <X />
        </button>

        <h2 className="text-xl font-bold mb-4">Update Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border p-2 rounded"
          />

          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border p-2 rounded"
          />
          <input
            name="priceCost"
            value={formData.priceCost}
            onChange={handleChange}
            placeholder="Price Cost"
            className="w-full border p-2 rounded"
          />
          <input
            name="priceWolesale"
            value={formData.priceWolesale}
            onChange={handleChange}
            placeholder="Price Wholesale"
            className="w-full border p-2 rounded"
          />

          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full border p-2 rounded"
          />

          <input
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="w-full border p-2 rounded"
          />

          <input
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full border p-2 rounded"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-2 rounded"
          />

          <Button disabled={loading} className="w-full">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Update Product"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
