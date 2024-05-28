"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent } from "react";

export default function SearchProduct() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const searchText = searchParams.get("search") ?? "";

  function changeText(e: ChangeEvent<HTMLInputElement>) {
    const searchValue = e.target.value;

    const params = new URLSearchParams();

    params.set("search", searchValue);

    if (searchValue) {
      replace(`/?${params.toString()}`);
    } else {
      replace("/");
    }
  }

  return (
    <div>
      <input
        className="focus:w-full w-20 rounded-lg p-1 focus:outline-none translate-all duration-300"
        placeholder="Search..."
        onChange={changeText}
        defaultValue={searchText}
      />
    </div>
  );
}
