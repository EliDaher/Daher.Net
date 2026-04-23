export type LocalizedText = {
  ar: string;
  en: string;
};

export type StoreProductType = "product" | "service";

export type StoreProduct = {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  type: StoreProductType;
  imageUrl: string;
  priceSell: number;
  priceCost: number;
  priceWholesale: number;
  stock: number;
  categoryId: string;
  brandId: string;
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type StoreOffer = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  imageUrl: string;
  startsAt: string;
  endsAt: string;
  isActive: boolean;
  productId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
};

export type StoreCategory = {
  id: string;
  label: LocalizedText;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type StoreBrand = {
  id: string;
  name: string;
  logoUrl: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type StoreBanner = {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  imageUrl: string;
  linkUrl: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
