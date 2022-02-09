import { WORDS } from '../constants/wordlist';
import { wordValidation } from '../constants/quenyaRule';

export const isWordInWordList = (word: string) => {
  return WORDS.includes(word.toLocaleLowerCase());
};

export const isWordValid = (word: string) => {
  return wordValidation(word.toLocaleLowerCase());
};

export const isWinningWord = (word: string) => {
  return solution === word;
};

export const getWordOfDay = () => {
  // January 1, 2022 Game Epoch
  const epochMs = new Date('January 1, 2022 00:00:00').valueOf();
  const now = Date.now();
  const msInDay = 86400000;
  const dayNumber = Math.floor((now - epochMs) / msInDay);
  const index = (dayNumber * (19730902 / 2)) % WORDS.length; // RIP Tolkien
  const nextday = (dayNumber + 1) * msInDay + epochMs;

  return {
    solution: WORDS[index].toLocaleUpperCase(),
    solutionIndex: index,
    tomorrow: nextday,
  };
};

export const { solution, solutionIndex, tomorrow } = getWordOfDay();
