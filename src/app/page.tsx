// export const revalidate = 0;

import { getAllProduct } from "@/actions";
import ProductsPage from "@/components/products/products-page";
import SearchProductsPage from "@/components/products/search-products-page";

import { Suspense } from "react";

export default async function HomePage() {
  const products = await getAllProduct();

  // console.log("products >>>", products);

  return (
    <div>
      {!products.data.products.length && (
        <div className="text-white">Empty</div>
      )}
      {!!products.data.products.length && (
        <>
          <div className="text-white font-semibold py-1">Home</div>
          <div className="flex flex-col gap-2">
            <Suspense fallback={<p>loading...</p>}>
              <ProductsPage products={products.data.products} />
            </Suspense>
            <Suspense fallback={<p>loading...</p>}>
              <SearchProductsPage products={products.data.products} />
            </Suspense>
          </div>
        </>
      )}
    </div>
  );
}
