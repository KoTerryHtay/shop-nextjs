"use server";

import { baseUrl, ProductsApiInterface } from "@/interface";

// refactor done
export async function getAllProduct() {
  const products = (await fetch(`${baseUrl}/api`).then((res) =>
    res.json()
  )) as ProductsApiInterface;

  // console.log("server products>>>", products);

  return products;
}
