import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

// refactor done
export async function POST(req: NextRequest) {
  const data = await req.formData();

  const productName = data.get("productName")?.toString()!;
  const remainPackage = data.get("remainPackage")?.toString()!;
  const remainMiniPackage = data.get("remainMiniPackage")?.toString()!;
  const brandName = data.get("brandName")?.toString()!;
  const categoryName = data.get("categoryName")?.toString()!;

  // console.log(">>>", productName, remainPackage, brandName, categoryName);

  const existingBrand = await db.brand.findFirst({
    where: {
      brandName,
    },
  });

  const existingCategory = await db.category.findFirst({
    where: {
      categoryName,
    },
  });

  const product = await db.product.create({
    data: {
      productName: productName,
      remainPackage: parseInt(remainPackage),
      remainMiniPackage: parseInt(remainMiniPackage),
      BrandProduct: {
        ...(existingBrand
          ? {
              connect: {
                brandId: existingBrand.brandId,
              },
            }
          : {
              create: {
                brandName,
              },
            }),
      },
      CategoryProduct: {
        ...(existingCategory
          ? {
              connect: {
                categoryId: existingCategory.categoryId,
              },
            }
          : {
              create: {
                categoryName,
              },
            }),
      },
    },
    // include: {
    //   BrandProduct: true,
    //   CategoryProduct: true,
    // },
  });

  // console.log("product result >>>", product);

  return NextResponse.json({
    status: "success",
    data: {
      product,
    },
  });
}

// refactor done
export async function PATCH(req: NextRequest) {
  const data = await req.formData();

  const id = +data.get("productId")?.toString()!;
  const remainPackage = +data.get("updatePackage")?.toString()!;
  const remainMiniPackage = +data.get("updateMiniPackage")?.toString()!;

  const isExit = await db.product.findFirst({
    where: { productId: id },
  });

  if (!isExit) {
    return NextResponse.json({
      status: "error",
      message: "product not found",
    });
  }

  const product = await db.product.update({
    where: { productId: id },
    data: {
      remainPackage,
      remainMiniPackage,
    },
  });

  // console.log("product update result >>>", product);

  return NextResponse.json({
    status: "success update",
    data: { product },
  });
}

// refactor done
export async function DELETE(req: NextRequest) {
  const productId = Number(req.nextUrl.searchParams.get("productId"));

  // console.log("delete req data id >>>", productId);

  const product = await db.product.findFirst({
    where: {
      productId,
    },
  });

  if (!product) {
    return NextResponse.json({
      status: "error",
      message: "product not found",
    });
  }

  // console.log("delete req product data >>>", product);

  const deleteProduct = await db.product.delete({
    where: {
      productId,
    },
  });

  // console.log("deleted data >>>", deleteProduct);

  return NextResponse.json({
    status: "successfully delete",
    data: {
      deleteProduct,
    },
  });
}
