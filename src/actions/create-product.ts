"use server";

import { ProductApiInterface } from "@/interface";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createProductSchema = z.object({
  productName: z.string(),
  remainPackage: z.number(),
  remainMiniPackage: z.number(),
  brandName: z.string(),
  categoryName: z.string(),
});

interface createProductFormState {
  errors: {
    productName?: string[];
    remainPackage?: string[];
    remainMiniPackage?: string[];
    brandName?: string[];
    categoryName?: string[];
  };
}

// refactor done
export async function CreateProduct(
  formState: createProductFormState,
  formData: FormData
): Promise<createProductFormState> {
  const result = createProductSchema.safeParse({
    productName: formData.get("productName"),
    remainPackage: parseInt(formData.get("remainPackage")?.toString()!),
    remainMiniPackage: parseInt(formData.get("remainMiniPackage")?.toString()!),
    brandName: formData.get("brandName"),
    categoryName: formData.get("categoryName"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const formResult = new FormData();
  formResult.append("productName", result.data.productName || "");
  formResult.append(
    "remainPackage",
    result.data.remainPackage.toString() || ""
  );
  formResult.append(
    "remainMiniPackage",
    result.data.remainMiniPackage.toString() || ""
  );
  formResult.append("brandName", result.data.brandName || "");
  formResult.append("categoryName", result.data.categoryName || "");

  // console.log("formResult >>>", formResult);

  let productResult: ProductApiInterface;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/create/api`,
      {
        method: "POST",
        body: formResult,
      }
    );

    productResult = (await response.json()) as ProductApiInterface;

    // console.log("create product >>>", result);

    if (!response.ok) {
      throw new Error("Failed to submit data");
    }
  } catch (error) {
    console.error("Error submitting data:", error);
    return { errors: {} };
  }
  revalidatePath("/");
  revalidatePath("/brand");
  revalidatePath("/category");
  revalidatePath(`/brand/${productResult.data.product.productBrandId}`);
  revalidatePath(`/category/${productResult.data.product.productCategoryId}`);
  redirect("/");
  // redirect(`/brand/${productResult.data.product.productBrandId}`);
}
