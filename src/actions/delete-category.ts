import { baseUrl, CategoryApiInterface } from "@/interface";
import { revalidatePath } from "next/cache";

// refactor done
export async function deleteCategory(categoryId: number) {
  "use server";

  const category = await fetch(
    `${baseUrl}/category/api?categoryId=${categoryId}`,
    {
      method: "DELETE",
    }
  );

  const deletedCategory = (await category.json()) as CategoryApiInterface;

  // console.log("delete success category >>>", deletedCategory.status);

  revalidatePath("/category");

  return deletedCategory;
}
