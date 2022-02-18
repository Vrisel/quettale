import { getGuessStatuses } from './statuses';
import { dayIndex } from './words';
import { t } from 'i18next';

export const shareStatus = async (guesses: string[], lost: boolean) => {
  const shareText =
    `${t('SHARE_TITLE')}\n` +
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
