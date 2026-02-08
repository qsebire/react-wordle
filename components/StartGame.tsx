"use client";

import { useState } from "react";
import { Button } from "./elements/Button";
import { checkIfWordExist } from "@/dictionary/dictionary";
import { strNoAccent } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { Select } from "./elements/Select";
import { Checkbox } from "./elements/Checkbox";

export function StartGame() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showFirstLetter, SetShowFirstLetter] = useState(false);
  const [numberOfLetter, SetNumberOfLetter] = useState("5");

  const fetchWord = async () => {
    setLoading(true);

    const MAX_ATTEMPS = 10;
    let attempt = 0;

    try {
      while (attempt < MAX_ATTEMPS) {
        attempt++;

        const response = await fetch(
          `https://trouve-mot.fr/api/size/${numberOfLetter}`,
        );

        if (!response.ok) {
          throw new Error(
            "Erreur de l'API. Merci d'envoyer un message à dev@quentin-sebire.fr",
          );
        }

        const [word] = await response.json();

        if (checkIfWordExist(word.name)) {
          sessionStorage.setItem(
            "secretWord",
            strNoAccent(word.name.toUpperCase()),
          );
          sessionStorage.setItem("wordLength", numberOfLetter.toString());
          sessionStorage.setItem("showFirstLetter", showFirstLetter.toString());

          router.push("/partie");
          return;
        }
      }

      throw new Error("Aucun mot valide trouvé. Essayez de recharger la page.");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex max-sm:flex-col gap-3 items-center text-xl font-semibold">
        <div className="flex gap-2 items-center">
          <p>Nombres de lettres</p>
          <Select
            value={numberOfLetter}
            onSelect={(value) => SetNumberOfLetter(value)}
            options={[
              { label: "4", value: "4" },
              { label: "5", value: "5" },
              { label: "6", value: "6" },
              { label: "7", value: "7" },
              { label: "8", value: "8" },
            ]}
          />
        </div>
        <p className="hidden sm:block">|</p>
        <div className="flex gap-2 items-center">
          <p>Montrer la première lettre ?</p>
          <Checkbox
            checked={showFirstLetter}
            onChecked={(e) => SetShowFirstLetter(!showFirstLetter)}
          />
        </div>
      </div>
      <Button label="Commencer" onClick={() => fetchWord()} />
    </div>
  );
}
