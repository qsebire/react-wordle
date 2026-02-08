import { EndGameMessage } from "@/components/EndGameMessage";
import { Instructions } from "@/components/Instructions";
import { StartGame } from "@/components/StartGame";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <div className="space-y-12">
        <Suspense fallback={<div>Loading...</div>}>
          <EndGameMessage />
        </Suspense>
        <div className="text-center">
          <div className="space-y-8">
            <h2 className="font-fascinate text-4xl sm:text-5xl md:text-6xl">
              Nouvelle Partie
            </h2>
            <StartGame />
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 right-4">
        <Instructions />
      </div>
    </div>
  );
}
