import { WORDS } from '../constants/wordlist';
import { wordValidation } from '../constants/quenyaRule';
import { getGuessStatuses } from './statuses';
import { t } from 'i18next';

export const isWordInWordList = (word: string) => {
  return WORDS.includes(word.toLocaleLowerCase());
};

export const isWordValid = (word: string) => {
  return wordValidation(word.toLocaleLowerCase());
};

export const isWinningWord = (word: string) => {
  return solution === word;
};

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
// also check if all revealed instances of a letter are used (i.e. two C's)
export const findFirstUnusedReveal = (word: string, guesses: string[]) => {
  if (guesses.length === 0) {
    return false;
  }

  const lettersLeftArray = new Array<string>();
  const guess = guesses[guesses.length - 1];
  const statuses = getGuessStatuses(guess);

  for (let i = 0; i < guess.length; i++) {
    if (statuses[i] === 'correct' || statuses[i] === 'present') {
      lettersLeftArray.push(guess[i]);
    }
    if (statuses[i] === 'correct' && word[i] !== guess[i]) {
      return t('MESSAGE_WRONG_SPOT', { guess: guess[i], position: i + 1 });
    }
  }

  // check for the first unused letter, taking duplicate letters
  // into account - see issue #198
  let n;
  for (const letter of word) {
    n = lettersLeftArray.indexOf(letter);
    if (n !== -1) {
      lettersLeftArray.splice(n, 1);
    }
  }

  if (lettersLeftArray.length > 0) {
    return t('MESSAGE_NOT_CONTAINED', { letter: lettersLeftArray[0] });
  }
  return false;
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
