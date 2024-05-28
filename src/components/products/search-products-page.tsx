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

export default function SearchProductsPage({
  products,
}: {
  products: Products[];
}) {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";

  const searchProducts =
    // products &&
    products.filter((product) =>
      product.productName.toLowerCase().includes(search.toLowerCase())
    );
  return (
    <>
      {!!search?.length &&
        searchProducts?.map((product) => (
          <UpdatePackage key={product.productId} product={product} />
        ))}
    </>
  );
}
