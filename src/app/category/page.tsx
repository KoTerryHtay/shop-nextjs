export const revalidate = 0;

import { deleteCategory } from "@/actions/delete-category";
import { getBrandCategory } from "@/actions/get-brand-category";
import Lists from "@/components/lists";

export default async function CategoryPage() {
  const data = await getBrandCategory();

  return (
    <div>
      <div className="text-white font-semibold py-1">Category Page</div>

      {!data.data.category.length && <div className="text-white">Empty</div>}

      <div className="flex flex-col gap-2">
        {data?.data.category.map((category) => (
          <Lists
            key={category.categoryId}
            id={category.categoryId}
            name={category.categoryName}
            type="category"
            total={category._count.products}
            deleteList={deleteCategory}
          />
        ))}
      </div>
    </div>
  );
}
