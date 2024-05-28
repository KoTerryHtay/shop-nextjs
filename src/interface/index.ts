import type { Brand, Category, Product } from "@prisma/client";

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface BrandInterface extends Brand {
  _count: { products: number };
}

interface CategoryInterface extends Category {
  _count: { products: number };
}

interface ProductInfoInterface extends Product {
  BrandProduct: Brand;
  CategoryProduct: Category;
}

export interface ProductBrandCategoryInterface {
  status: string;
  data: {
    products: ProductInfoInterface[];
    brand: BrandInterface[];
    category: CategoryInterface[];
  };
}

export interface ProductApiInterface {
  status: string;
  data: {
    product: Product;
  };
}

export interface BrandApiInterface {
  status: string;
  data: {
    brand: Brand;
  };
}

export interface CategoryApiInterface {
  status: string;
  data: {
    category: Category;
  };
}

export interface ProductsApiInterface {
  status: string;
  data: {
    products: Product[];
  };
}
