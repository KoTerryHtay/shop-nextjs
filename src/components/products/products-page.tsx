"use client";

import { useSearchParams } from "next/navigation";
import UpdatePackage from "../update-package";

type Products = {
  productId: number;
  productName: string;
  remainPackage: number;
  remainMiniPackage: number;
  productBrandId: number;
  productCategoryId: number;
};

export default function ProductsPage({ products }: { products: Products[] }) {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  return (
    <>
      {!search?.length &&
        products.map((product) => (
          <UpdatePackage key={product.productId} product={product} />
        ))}
    </>
  );
}
