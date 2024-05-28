// export const revalidate = 0;

import * as actions from "@/actions";
import { deleteBrand } from "@/actions/delete-brand";
import Lists from "@/components/lists";

export default async function BrandPage() {
  const data = await actions.getBrandCategory();

  return (
    <div>
      <div className="text-white font-semibold py-1">Brand Page</div>

      {!data.data.brand.length && <div className="text-white">Empty</div>}

      <div className="flex flex-col gap-2">
        {data?.data.brand.map((brand) => (
          <Lists
            key={brand.brandId}
            id={brand.brandId}
            name={brand.brandName}
            type="brand"
            total={brand._count.products}
            deleteList={deleteBrand}
          />
        ))}
      </div>
    </div>
  );
}
