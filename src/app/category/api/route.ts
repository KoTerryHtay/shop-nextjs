import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

// refactor done
export async function DELETE(req: NextRequest) {
  const categoryId = Number(req.nextUrl.searchParams.get("categoryId"));

  // console.log("DELETE req categoryId >>>", categoryId);

  const category = await db.category.findFirst({
    where: {
      categoryId,
    },
  });

  if (!category)
    return NextResponse.json({
      status: "Category not found",
    });

  const deletedCategory = await db.category.delete({
    where: { categoryId },
  });

  return NextResponse.json({
    status: "successfully deleted category",
    data: {
      category: deletedCategory,
    },
  });
}
