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

const fibResult: number[] = [34, 55];
const fibonacci = (index: number): number => {
  if (!fibResult[index]) {
    fibResult[index] = fibonacci(index - 1) + fibonacci(index - 2);
  }
  return fibResult[index];
};

export const getWordOfDay = () => {
  // February 10, 2022 Game Epoch
  const epochMs = new Date('February 10, 2022 00:00:00').valueOf();
  const now = Date.now();
  const msInDay = 86400000;
  const dayIndex = Math.ceil((now - epochMs) / msInDay);
  const index = fibonacci(dayIndex) % WORDS.length;
  const nextday = dayIndex * msInDay + epochMs;

  return {
    solution: WORDS[index].toLocaleUpperCase(),
    dayIndex: dayIndex,
    tomorrow: nextday,
  };
};

export const { solution, dayIndex, tomorrow } = getWordOfDay();
