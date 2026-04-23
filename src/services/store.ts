import axios from "axios";
import apiClient from "@/lib/axios";
import type {
  StoreBanner,
  StoreBrand,
  StoreCategory,
  StoreOffer,
  StoreProduct,
} from "@/types/store";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

function toErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

async function getList<T>(endpoint: string, params?: Record<string, unknown>) {
  try {
    const response = await apiClient.get<ApiResponse<T[]>>(endpoint, { params });
    return response.data.data || [];
  } catch (error) {
    throw new Error(toErrorMessage(error, `Failed to fetch ${endpoint}`));
  }
}

async function createOne<T>(endpoint: string, payload: object) {
  try {
    const response = await apiClient.post<ApiResponse<T>>(endpoint, payload);
    return response.data.data;
  } catch (error) {
    throw new Error(toErrorMessage(error, `Failed to create ${endpoint}`));
  }
}

async function updateOne<T>(endpoint: string, payload: object) {
  try {
    const response = await apiClient.put<ApiResponse<T>>(endpoint, payload);
    return response.data.data;
  } catch (error) {
    throw new Error(toErrorMessage(error, `Failed to update ${endpoint}`));
  }
}

async function patchOne<T>(endpoint: string, payload: object) {
  try {
    const response = await apiClient.patch<ApiResponse<T>>(endpoint, payload);
    return response.data.data;
  } catch (error) {
    throw new Error(toErrorMessage(error, `Failed to patch ${endpoint}`));
  }
}

async function removeOne(endpoint: string) {
  try {
    const response = await apiClient.delete<ApiResponse<{ id: string }>>(endpoint);
    return response.data.data;
  } catch (error) {
    throw new Error(toErrorMessage(error, `Failed to delete ${endpoint}`));
  }
}

export const storeApi = {
  // Products
  listProducts(params?: Record<string, unknown>) {
    return getList<StoreProduct>("/api/store/products", params);
  },
  createProduct(payload: object) {
    return createOne<StoreProduct>("/api/store/products", payload);
  },
  updateProduct(id: string, payload: object) {
    return updateOne<StoreProduct>(`/api/store/products/${id}`, payload);
  },
  updateProductPrices(id: string, payload: object) {
    return patchOne<StoreProduct>(`/api/store/products/${id}/prices`, payload);
  },
  updateProductStock(id: string, payload: object) {
    return patchOne<StoreProduct>(`/api/store/products/${id}/stock`, payload);
  },
  setProductPublish(id: string, isPublished: boolean) {
    return patchOne<StoreProduct>(`/api/store/products/${id}/publish`, { isPublished });
  },
  deleteProduct(id: string) {
    return removeOne(`/api/store/products/${id}`);
  },

  // Offers
  listOffers(params?: Record<string, unknown>) {
    return getList<StoreOffer>("/api/store/offers", params);
  },
  createOffer(payload: object) {
    return createOne<StoreOffer>("/api/store/offers", payload);
  },
  updateOffer(id: string, payload: object) {
    return updateOne<StoreOffer>(`/api/store/offers/${id}`, payload);
  },
  setOfferActive(id: string, isActive: boolean) {
    return patchOne<StoreOffer>(`/api/store/offers/${id}/active`, { isActive });
  },
  deleteOffer(id: string) {
    return removeOne(`/api/store/offers/${id}`);
  },

  // Categories
  listCategories(params?: Record<string, unknown>) {
    return getList<StoreCategory>("/api/store/categories", params);
  },
  createCategory(payload: object) {
    return createOne<StoreCategory>("/api/store/categories", payload);
  },
  updateCategory(id: string, payload: object) {
    return updateOne<StoreCategory>(`/api/store/categories/${id}`, payload);
  },
  setCategoryActive(id: string, isActive: boolean) {
    return patchOne<StoreCategory>(`/api/store/categories/${id}/active`, { isActive });
  },
  deleteCategory(id: string) {
    return removeOne(`/api/store/categories/${id}`);
  },

  // Brands
  listBrands(params?: Record<string, unknown>) {
    return getList<StoreBrand>("/api/store/brands", params);
  },
  createBrand(payload: object) {
    return createOne<StoreBrand>("/api/store/brands", payload);
  },
  updateBrand(id: string, payload: object) {
    return updateOne<StoreBrand>(`/api/store/brands/${id}`, payload);
  },
  setBrandActive(id: string, isActive: boolean) {
    return patchOne<StoreBrand>(`/api/store/brands/${id}/active`, { isActive });
  },
  deleteBrand(id: string) {
    return removeOne(`/api/store/brands/${id}`);
  },

  // Banners
  listBanners(params?: Record<string, unknown>) {
    return getList<StoreBanner>("/api/store/banners", params);
  },
  createBanner(payload: object) {
    return createOne<StoreBanner>("/api/store/banners", payload);
  },
  updateBanner(id: string, payload: object) {
    return updateOne<StoreBanner>(`/api/store/banners/${id}`, payload);
  },
  setBannerActive(id: string, isActive: boolean) {
    return patchOne<StoreBanner>(`/api/store/banners/${id}/active`, { isActive });
  },
  deleteBanner(id: string) {
    return removeOne(`/api/store/banners/${id}`);
  },
};
