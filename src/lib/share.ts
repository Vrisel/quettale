import { getGuessStatuses } from './statuses';
import { dayIndex } from './words';
import { t } from 'i18next';
import { getStoredIsHighContrastMode } from './localStorage';
import { MAX_CHALLENGES } from '../constants/settings';

export const shareStatus = (
  guesses: string[],
  lost: boolean,
  isHardMode: boolean
) => {
  const shareText =
    `${t('SHARE_TITLE')}\n` +
    `${dayIndex} ${lost ? 'X' : guesses.length}/${MAX_CHALLENGES}${
      isHardMode ? '*' : ''
    }\n\n` +
    generateEmojiGrid(guesses);
  const shareUrl = 'https://quettale.vercel.app';
  if (
    typeof navigator.share !== 'undefined' &&
    /[Ww]indows?/.test(navigator.userAgent) === false
  )
    return navigator
      .share({
        text: shareText,
        url: shareUrl,
      })
      .then(() => 'shared')
      .catch(() => 'failed');
  else {
    return navigator.clipboard
      .writeText(`${shareText}\n\n${shareUrl}`)
      .then(() => 'copied')
      .catch(() => 'failed');
  }
};

export const generateEmojiGrid = (guesses: string[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess);
      const isHighContrast = getStoredIsHighContrastMode();
      return guess
        .split('')
        .map((_, i) => {
          switch (status[i]) {
            case 'correct':
              return isHighContrast ? '🟧' : '🟩';
            case 'present':
              return isHighContrast ? '🟦' : '🟨';
            default:
              return localStorage.getItem('theme') === 'dark' ? '⬛' : '⬜';
          }
        })
        .join('');
    })
    .join('\n');
};
