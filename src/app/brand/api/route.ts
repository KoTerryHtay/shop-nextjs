import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

// refactor done
export async function GET() {
  const products = await db.product.findMany({
    include: {
      BrandProduct: true,
      CategoryProduct: true,
    },
  });

  const brand = await db.brand.findMany({
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  });

  const category = await db.category.findMany({
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  });

  // console.log("products >>>", products);
  // console.log("brand >>>", brand);

  return NextResponse.json({
    status: "success",
    data: {
      products,
      brand,
      category,
    },
  });
}

// refactor done
export async function DELETE(req: NextRequest) {
  const brandId = Number(req.nextUrl.searchParams.get("brandId"));

  // console.log("DELETE req brandId >>>", brandId);
  const brand = await db.brand.findFirst({
    where: {
      brandId,
    },
  });

  if (!brand)
    return NextResponse.json({
      status: "product not found",
    });

  const deletedBrand = await db.brand.delete({
    where: { brandId },
  });

  return NextResponse.json({
    status: "successfully deleted",
    data: {
      brand: deletedBrand,
    },
  });
}
