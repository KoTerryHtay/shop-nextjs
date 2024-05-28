import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

// refactor done
export async function GET() {
  const products = await db.product.findMany({
    orderBy: {
      productId: "desc",
      // remainPackage: "asc",
    },
  });

  // console.log("GET products >>>", products);

  return NextResponse.json({
    status: "success",
    data: {
      products,
    },
  });
}

export async function PATCH(req: NextRequest) {
  const { id, updatePackage } = (await req.json()) as {
    id: number;
    updatePackage: number;
  };

  // console.log("update data >>>", id, updatePackage);

  const checkProduct = await db.product.findFirst({
    where: {
      productId: id,
    },
  });

  if (!checkProduct) {
    return NextResponse.json({
      status: "error",
      message: "product not found",
    });
  }

  // console.log("update product data", checkProduct);

  const product = await db.product.update({
    where: {
      productId: id,
    },
    data: {
      remainPackage: updatePackage,
    },
  });

  // console.log("finish update data", product);

  return NextResponse.json({
    status: "successfully update",
    data: {
      product,
    },
  });
}
