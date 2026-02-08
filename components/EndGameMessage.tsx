"use client";

import { useSearchParams } from "next/navigation";

export function EndGameMessage() {
  const searchParams = useSearchParams();

  if (!searchParams.get("word")) {
    return;
  }

  return (
    <div className="text-center space-y-2 border border-white py-6 px-8 rounded-2xl">
      <p className="font-fascinate text-4xl">
        {searchParams.get("find") === "true" ? "BRAVO !" : "DOMMAGE !"}
      </p>
      <p className="text-2xl ">
        {searchParams.get("find") === "true"
          ? "Vous avez trouvé le mot"
          : "Vous trouverez la prochaine fois"}
      </p>
      <p className="text-xl font-bold">
        Le mot était : {searchParams.get("word")}
      </p>
    </div>
  );
}
