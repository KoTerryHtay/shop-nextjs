import { baseUrl, BrandApiInterface } from "@/interface";
import { revalidatePath } from "next/cache";

// refactor done
export async function deleteBrand(brandId: number) {
  "use server";

  const brand = await fetch(`${baseUrl}/brand/api?brandId=${brandId}`, {
    method: "DELETE",
  });

  const deleteBrand = (await brand.json()) as BrandApiInterface;

  // console.log("deleted brand >>>", brand);

  revalidatePath("/brand");

  return deleteBrand;
}
