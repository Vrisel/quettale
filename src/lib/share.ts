import { getGuessStatuses } from './statuses';
import { dayIndex } from './words';
import { GAME_TITLE } from '../constants/strings';

export const shareStatus = async (guesses: string[], lost: boolean) => {
  const shareText =
    `${GAME_TITLE}: 퀘냐 워들\n` +
    `${dayIndex} ${lost ? 'X' : guesses.length}/6\n\n` +
    generateEmojiGrid(guesses);
  const shareUrl = 'https://quettale.vercel.app';
  if (
    typeof navigator.share !== 'undefined' &&
    /[Ww]indows?/.test(navigator.userAgent) === false
  )
    await navigator.share({
      text: shareText,
      url: shareUrl,
    });
  else navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
};

export const generateEmojiGrid = (guesses: string[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess);
      return guess
        .split('')
        .map((_, i) => {
          switch (status[i]) {
            case 'correct':
              return '🟩';
            case 'present':
              return '🟨';
            default:
              return '⬜';
          }
        })
        .join('');
    })
    .join('\n');
};
