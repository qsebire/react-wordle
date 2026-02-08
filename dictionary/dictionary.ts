import { frenchDictionary } from "./french";

const setFrDictionary = new Set(frenchDictionary);

export const checkIfWordExist = (word: string) => {
  const lowerCaseWord = word.toLowerCase();
  return setFrDictionary.has(lowerCaseWord);
};
