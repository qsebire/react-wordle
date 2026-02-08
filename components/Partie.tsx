"use client";

import { checkIfWordExist } from "@/dictionary/dictionary";
import { replaceAt } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Instructions } from "./Instructions";
import { Box } from "./elements/Box";

const correctionArr = (
  secretWord: string,
  wordLength: number,
  lastAttempt: string,
): ("none" | "missPlace" | "wellPlace")[] => {
  const wordCorrectionArr: ("none" | "missPlace" | "wellPlace")[] = [];
  // Check if word exist
  let correctionWord = secretWord;
  // Check well placed letters and remove it for avoid to be include in miss placed
  for (let i = 0; i < wordLength; i++) {
    if (lastAttempt[i] === correctionWord[i]) {
      wordCorrectionArr.push("wellPlace");
      correctionWord = replaceAt(correctionWord, i, "1");
      console.log(correctionWord);
    }
  }

  for (let i = 0; i < wordLength; i++) {
    // Check miss placed letters and remove it for avoid double
    if (correctionWord[i] !== "1" && correctionWord.includes(lastAttempt[i])) {
      wordCorrectionArr.splice(i, 0, "missPlace");
      const indexCorrectLetter = correctionWord.indexOf(lastAttempt[i]);
      correctionWord = replaceAt(correctionWord, indexCorrectLetter, "2");
    } else if (correctionWord[i] !== "1") {
      wordCorrectionArr.splice(i, 0, "none");
    }
  }
  return wordCorrectionArr;
};

export function Partie() {
  const router = useRouter();

  const wordLength = useRef<number | null>(null);
  const [secretWord, setSecretWord] = useState<string | null>(null);
  const [firstLetter, setFirstLetter] = useState<string>("");
  const [showFirstLetter, setShowFirstLetter] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<string[]>([""]);
  const [corrections, setCorrections] = useState<
    ("none" | "missPlace" | "wellPlace" | "nonExisting")[][]
  >([]);

  const tryNumber = 6;

  const correctionStyle = {
    none: "black",
    missPlace: "#D1741D",
    wellPlace: "#1A8925",
    nonExisting: "#932210",
  };

  // Get elements in sessionStorage
  useEffect(() => {
    const word = sessionStorage.getItem("secretWord");
    const wordLengthStorage = sessionStorage.getItem("wordLength");
    const showFirstLetterStorage = sessionStorage.getItem("showFirstLetter");

    if (!word || !wordLengthStorage) {
      router.push("/");
      return;
    }

    setSecretWord(word);
    setFirstLetter(word.charAt(0));
    setAttempts([showFirstLetterStorage === "true" ? word.charAt(0) : ""]);
    setShowFirstLetter(showFirstLetterStorage === "true");
    wordLength.current = parseInt(wordLengthStorage, 10);
  }, []);

  // Manage key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();

      if (/^[A-Z]$/.test(key)) {
        setAttempts((prev) => {
          const newAttempts = [...prev];
          const indexLastAttempt = newAttempts.length - 1;
          newAttempts[indexLastAttempt] += key;
          return newAttempts;
        });
      }

      if (key === "BACKSPACE") {
        setAttempts((prev) => {
          const newAttempts = [...prev];
          const indexLastAttempt = newAttempts.length - 1;
          const lastWord = newAttempts[indexLastAttempt];
          newAttempts[indexLastAttempt] = lastWord.substring(
            0,
            lastWord.length - 1,
          );
          return newAttempts;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Check when word is finished
  useEffect(() => {
    const lastAttempt = attempts[attempts.length - 1];
    const length = wordLength.current;
    // If word is finished
    if (lastAttempt.length === length) {
      // Check if word exist
      const isExistingWord = checkIfWordExist(lastAttempt);
      if (!isExistingWord) {
        setCorrections((prev) => {
          const wordCorrectionArr: "nonExisting"[] = [];

          for (let i = 0; i < length; i++) {
            wordCorrectionArr.push("nonExisting");
          }
          const newCorrection = [...prev, wordCorrectionArr];
          return newCorrection;
        });
      }
      // Make correction
      if (isExistingWord && secretWord && length !== null) {
        setCorrections((prev) => {
          const newCorrection = [
            ...prev,
            correctionArr(secretWord, length, lastAttempt),
          ];
          return newCorrection;
        });
      }

      setTimeout(() => {
        if (lastAttempt === secretWord) {
          router.push(`/?find=true&word=${secretWord}`);
          return;
        }

        if (attempts.length === tryNumber) {
          router.push(`/?find=false&word=${secretWord}`);
          return;
        }

        // Create new word
        setAttempts((prev) => [...prev, showFirstLetter ? firstLetter : ""]);
      }, 100);
    }
  }, [attempts]);

  if (!secretWord) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        {Array.from({ length: tryNumber }).map((_, rowIndex) => {
          const attempt = attempts[rowIndex] || "";
          const correction = corrections[rowIndex];
          return (
            <div key={rowIndex} className="flex gap-2 md:gap-4 mb-2 md:mb-4">
              {Array.from({ length: wordLength.current || 0 }).map(
                (_, colIndex) => {
                  const backgroundCorrectionStyle = correction
                    ? correctionStyle[correction[colIndex]]
                    : "none";
                  return (
                    <Box
                      key={colIndex}
                      letter={attempt[colIndex] || ""}
                      background={backgroundCorrectionStyle}
                      nbrBox={wordLength.current || 0}
                    />
                  );
                },
              )}
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-4 right-4">
        <Instructions />
      </div>
    </div>
  );
}
