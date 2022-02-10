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
  // February 10, 2022 Game Epoch
  const epochMs = new Date('February 10, 2022 00:00:00').valueOf();
  const now = Date.now();
  const msInDay = 86400000;
  const dayIndex = Math.ceil((now - epochMs) / msInDay);
  const index = (dayIndex * (19730902 / 2)) % WORDS.length; // RIP Tolkien
  const nextday = (dayIndex + 1) * msInDay + epochMs;

  return {
    solution: WORDS[index].toLocaleUpperCase(),
    dayIndex: dayIndex,
    tomorrow: nextday,
  };
};

export const { solution, dayIndex, tomorrow } = getWordOfDay();
