export const revalidate = 0;

import { getBrandCategory } from "@/actions/get-brand-category";
import UpdatePackage from "@/components/update-package";

interface PropsType {
  params: {
    brandId: string;
  };
}

export default async function BrandDetailPage({ params }: PropsType) {
  const data = await getBrandCategory();

  const products = data?.data.products.filter(
    (product) => product.productBrandId === parseInt(params.brandId)
  );

  return (
    <div>
      {!products.length && <div className="text-white">Empty</div>}
      <div className="flex flex-col gap-2">
        {products?.map((product) => (
          <UpdatePackage product={product} key={product.productId} />
        ))}
      </div>

      {/* <div>
        <div popover="auto" id="my-popover">
          Greetings, one and all!
        </div>
        <button popovertarget="my-popover" popovertargetaction="show">
          Open Popover
        </button>
        <input
          type="button"
          popovertarget="my-popover"
          popovertargetaction="hide"
          value="Close Popover"
        />
      </div> */}
    </div>
  );
}
