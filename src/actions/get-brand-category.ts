"use server";

import { ProductBrandCategoryInterface } from "@/interface";

// refactor done
export async function getBrandCategory() {
  const data = (await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/brand/api`
  ).then((res) => res.json())) as ProductBrandCategoryInterface;

  return data;
}
