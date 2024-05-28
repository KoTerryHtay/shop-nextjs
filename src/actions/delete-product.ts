"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ProductApiInterface } from "@/interface";
import { db } from "@/db";

export async function deleteProduct(id: number, pathname: string) {
  const checkProduct = await db.product.findFirst({
    where: {
      productId: id,
    },
  });

  let deletedProduct: ProductApiInterface;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/create/api?productId=${id}`,
      {
        method: "DELETE",
      }
    );

    deletedProduct = (await response.json()) as ProductApiInterface;

    // console.log("deletedProduct >>>", deletedProduct);
  } catch (error) {
    console.error("Error update submitting data:", error);
    return null;
  }
  revalidatePath("/");
  revalidatePath("/brand");
  revalidatePath("/category");
  revalidatePath(`/brand/${checkProduct?.productBrandId}`);
  revalidatePath(`/category/${checkProduct?.productCategoryId}`);
  redirect(pathname);
}
