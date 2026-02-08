"use client";

import { X } from "lucide-react";
import { useState } from "react";

export function Instructions() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="bg-background border border-white rounded-xl py-4 px-6 text-lg space-y-2 cursor-pointer max-w-xl"
      onClick={() => {
        setOpen(!open);
      }}
    >
      {!open && <p className="text-xl font-bold">i</p>}
      {open && (
        <div className="relative">
          <p className="text-xl font-bold">Instructions</p>
          <p>Vous avez 6 chances pour trouver le mot secret.</p>
          <p>
            Lorsque vous faites une porposition, des indices peuvent vous aider
            à trouver le mot.
          </p>
          <div className="flex gap-2 items-center">
            <div className="w-5 bg-[#1A8925] aspect-square rounded" />
            <p> La lettre est bien placé</p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-5 bg-[#D1741D] aspect-square rounded" />
            <p> La lettre est dans le mot mais est mal placée</p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-5 bg-[#B82A14] aspect-square rounded" />
            <p> Le mot n'existe pas</p>
          </div>
          <X className="absolute top-0 right-0 stroke-3" />
        </div>
      )}
    </div>
  );
}
