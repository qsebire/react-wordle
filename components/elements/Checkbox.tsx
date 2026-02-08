"use client";

import { Check } from "lucide-react";
import { MouseEvent, useState } from "react";

export function Checkbox({
  checked,
  onChecked,
}: {
  checked: boolean;
  onChecked: (value: boolean) => void;
}) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChecked = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newChecked = !checked;
    setIsChecked(newChecked);
    onChecked(newChecked);
  };

  return (
    <button
      className="w-9 aspect-square border border-white rounded-lg cursor-pointer flex justify-center items-center"
      onClick={(e) => handleChecked(e)}
    >
      {isChecked && <Check className="w-5 h-5 text-white stroke-3" />}
    </button>
  );
}
