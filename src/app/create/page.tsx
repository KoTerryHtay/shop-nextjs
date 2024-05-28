"use client";

import FormButton from "@/components/form-button";
import {
  Autocomplete,
  AutocompleteItem,
  Divider,
  Input,
} from "@nextui-org/react";
import { useFormState } from "react-dom";
import * as actions from "@/actions";
import { useEffect, useState } from "react";
import { getBrandCategory } from "@/actions/get-brand-category";
import { ProductBrandCategoryInterface } from "@/interface";

export default function CreatePage() {
  const [data, setData] = useState<ProductBrandCategoryInterface>();
  const [productName, setProductName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const existingProduct = data?.data.products.find(
    (product) =>
      product.productName === productName &&
      product.BrandProduct.brandName === brandName &&
      product.CategoryProduct.categoryName === categoryName
  );

  // console.log("Existing Product >>>", existingProduct);

  // console.log("data >>>", data);

  useEffect(function () {
    getBrandCategory().then((data) => setData(data));
  }, []);

  const [formState, action] = useFormState(actions.CreateProduct, {
    errors: {},
  });

  const [formStateUpdate, updateAction] = useFormState(
    actions.updatePackage.bind(null, existingProduct?.productId!, "/"),
    {
      errors: {},
    }
  );

  return (
    <div className="text-[#EEEEEE]">
      <div className="flex items-center justify-between">
        <div className="text-center">CreatePage</div>
      </div>
      <Divider className="bg-[#EEEEEE] my-1" />
      <form
        action={!!existingProduct ? updateAction : action}
        className="flex flex-col gap-2"
      >
        <div>
          <label htmlFor="productName">Product Name</label>
          <Input
            id="productName"
            name="productName"
            placeholder="Product Name"
            className="w-auto"
            list="browsers"
            onChange={(e) => setProductName(e.target.value)}
          />
          <datalist id="browsers">
            {data?.data.products.map((product) => (
              <option
                key={product.productId}
                value={product.productName}
              ></option>
            ))}
          </datalist>
        </div>
        <div>
          <div>Brand Name</div>
          <Autocomplete
            variant="flat"
            aria-label="brand"
            defaultItems={data?.data.brand || []}
            placeholder="Brand Name"
            allowsCustomValue
            name="brandName"
            onInputChange={(value) => setBrandName(value)}
          >
            {(brand) => (
              <AutocompleteItem key={brand.brandId}>
                {brand.brandName}
              </AutocompleteItem>
            )}
          </Autocomplete>
        </div>
        <div>
          <div>Category Name</div>
          <Autocomplete
            variant="flat"
            aria-label="category"
            defaultItems={data?.data.category || []}
            placeholder="Category Name"
            allowsCustomValue
            onInputChange={(value) => setCategoryName(value)}
            name="categoryName"
          >
            {(category) => (
              <AutocompleteItem key={category.categoryId}>
                {category.categoryName}
              </AutocompleteItem>
            )}
          </Autocomplete>
        </div>
        <div className="space-y-1">
          <label htmlFor="remainPackage" className="space-x-1">
            <span>Remain Package</span>
            {!!existingProduct && (
              <span className=" bg-[#222831] p-0.5 px-2 rounded border border-white text-xs">
                လက်ကျန် : {existingProduct.remainPackage}
                {existingProduct.remainMiniPackage !== 0 && (
                  <span className="px-1">
                    / {existingProduct.remainMiniPackage} ထုတ်
                  </span>
                )}
              </span>
            )}
          </label>
          <div className="flex gap-1">
            <Input
              id="remainPackage"
              name="remainPackage"
              placeholder="Remain Package"
              className="w-auto"
            />
            <Input
              id="remainMiniPackage"
              name="remainMiniPackage"
              placeholder="အထုတ်"
              className="w-auto"
            />
          </div>
        </div>

        <FormButton>{!!existingProduct ? "Update" : "Create"}</FormButton>
      </form>
    </div>
  );
}
