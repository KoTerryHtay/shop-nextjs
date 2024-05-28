"use client";

import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

export default function FormButton({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress?: () => void;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      onPress={onPress}
      type="submit"
      className="bg-[#00ADB5] text-white font-bold"
      isLoading={pending}
    >
      {children}
    </Button>
  );
}
