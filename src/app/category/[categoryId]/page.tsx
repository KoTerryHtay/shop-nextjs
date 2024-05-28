export const revalidate = 0;

import { getBrandCategory } from "@/actions/get-brand-category";
import UpdatePackage from "@/components/update-package";

interface PropsType {
  params: {
    categoryId: string;
  };
}

export default async function CategoryDetailPage({ params }: PropsType) {
  const data = await getBrandCategory();

  const products = data?.data.products.filter(
    (product) => product.productCategoryId === parseInt(params.categoryId)
  );

  return (
    <div>
      {!products.length && <div className="text-white">Empty</div>}
      <div className="flex flex-col gap-2">
        {products?.map((product) => (
          <UpdatePackage key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
}
