"use client";

import { useFormState } from "react-dom";
import * as actions from "@/actions";
import FormButton from "@/components/form-button";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import type { Product } from "@prisma/client";
import { usePathname } from "next/navigation";

export default function UpdatePackage({ product }: { product: Product }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const pathname = usePathname();
  // console.log("pathname >>>", pathname);

  const [formState, action] = useFormState(
    actions.updatePackage.bind(null, product?.productId, pathname),
    {
      errors: {},
    }
  );

  function deleteProduct() {
    actions.deleteProduct(product.productId, pathname);
    // console.log(product.productId, pathname);
  }

  return (
    <div
      key={product.productId}
      className="bg-[#222831] text-[#EEEEEE] p-2 rounded-md font-semibold text-center shadow-sm shadow-black flex justify-between items-center"
    >
      <div className="flex flex-col gap-1 items-start">
        <div>{product.productName}</div>
        <div className="flex gap-1 items-center">
          {product.remainPackage !== 0 || product.remainMiniPackage !== 0 ? (
            <div className="flex items-center">
              လက်ကျန် -
              <span
                className={`${
                  product.remainPackage <= 2
                    ? " bg-red-700 p-0.5 px-2 rounded border border-red-600"
                    : " bg-[#393E46] p-0.5 px-2 rounded border border-[#393E46]"
                }`}
              >
                {product.remainPackage}
                {product.remainMiniPackage !== 0 && (
                  <span className="px-1">
                    / {product.remainMiniPackage} ထုတ်
                  </span>
                )}
              </span>
            </div>
          ) : (
            <span
              className={`${
                product.remainPackage <= 2
                  ? " bg-red-700 p-0.5 px-2 rounded border border-red-600"
                  : ""
              }`}
            >
              လက်ကျန်မရှိပါ
            </span>
          )}
        </div>
      </div>
      <div
        onClick={onOpen}
        className="active:bg-[#D9D9D9] active:text-[#000000] px-2 rounded-full hover:cursor-pointer"
      >
        Edit
      </div>
      <Modal
        size="xs"
        isOpen={isOpen}
        placement={"center"}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <form action={action}>
                <ModalBody>
                  <div className="flex flex-col gap-1">
                    <div>Product Name : {product.productName}</div>
                    <div>
                      လက်ကျန် : {product.remainPackage}
                      {product.remainMiniPackage !== 0 && (
                        <span className="px-1">
                          / {product.remainMiniPackage} ထုတ်
                        </span>
                      )}
                    </div>

                    {/* <label htmlFor="updatePackage">Remain Package</label> */}
                    <Input
                      id="remainPackage"
                      name="remainPackage"
                      placeholder="Update Package"
                      className="w-auto py-2"
                      defaultValue={product.remainPackage.toString()}
                    />
                    <Input
                      id="remainMiniPackage"
                      name="remainMiniPackage"
                      placeholder="အထုတ်"
                      className="w-auto py-2"
                      defaultValue={product.remainMiniPackage.toString()}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" onClick={deleteProduct}>
                    Delete
                  </Button>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <FormButton onPress={onClose}>Update</FormButton>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
