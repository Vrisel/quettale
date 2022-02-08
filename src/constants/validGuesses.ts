import {
  CONSONANTS,
  INITIAL_CONSONANTS,
  LAST_CONSONANTS,
  VOWELS,
} from './quenyaRule';
import { MAX_WORD_LENGTH } from './settings';

const possibleCombination: string[] = [
  ...VOWELS.reduce((acc, curr) => {
    acc.push(...tailWord(curr, true));
    return acc;
  }, [] as string[]),
  ...INITIAL_CONSONANTS.reduce((acc, curr) => {
    acc.push(...tailWord(curr, false));
    return acc;
  }, [] as string[]),
];
// console.log(possibleCombination);

function tailWord(comb: string, wasVowel: boolean): string[] {
  if (wasVowel) {
    if (comb.length === MAX_WORD_LENGTH - 1)
      return LAST_CONSONANTS.map((c) => comb + c);
    else if (comb.length === MAX_WORD_LENGTH) return [comb];
    else if (comb.length > MAX_WORD_LENGTH) return [];
  }

  const letters = wasVowel ? CONSONANTS : VOWELS;
  const words: string[] = [];
  letters.forEach((e) => {
    words.push(...tailWord(comb + e, !wasVowel));
  });
  return words;
}

export const VALID_GUESSES = possibleCombination;
