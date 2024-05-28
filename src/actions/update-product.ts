"use server";

import { ProductApiInterface } from "@/interface";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const updatePackageSchema = z.object({
  package: z.number(),
  miniPackage: z.number(),
});

interface updatePackageFormState {
  errors: {
    package?: string[];
    miniPackage?: string[];
  };
}

// refactor done
export async function updatePackage(
  id: number,
  pathname: string,
  formState: updatePackageFormState,
  formData: FormData
): Promise<updatePackageFormState> {
  const result = updatePackageSchema.safeParse({
    package: parseInt(formData.get("remainPackage")?.toString()!),
    miniPackage: parseInt(formData.get("remainMiniPackage")?.toString()!),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // console.log("update >>>", id, result.data.package);

  const formResult = new FormData();
  formResult.append("updatePackage", result.data.package.toString() || "");
  formResult.append(
    "updateMiniPackage",
    result.data.miniPackage.toString() || ""
  );
  formResult.append("productId", id.toString() || "");

  // console.log("formResult >>>", formResult);

  let updatedProduct: ProductApiInterface;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/create/api`,
      {
        method: "PATCH",
        body: formResult,
      }
    );

    updatedProduct = (await response.json()) as ProductApiInterface;

    // console.log("update response >>>", result.data.product.productId);
  } catch (error) {
    console.error("Error update submitting data:", error);
    return {
      errors: {},
    };
  }

  revalidatePath("/");
  revalidatePath(`/brand/${updatedProduct.data.product.productBrandId}`);
  revalidatePath(`/category/${updatedProduct.data.product.productCategoryId}`);

  redirect(pathname);
}
