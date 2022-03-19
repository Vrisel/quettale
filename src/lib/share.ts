import { getGuessStatuses } from './statuses';
import { dayIndex, unicodeSplit } from './words';
import { t } from 'i18next';
import { MAX_CHALLENGES } from '../constants/settings';
import { UAParser } from 'ua-parser-js';

const webShareApiDeviceTypes: string[] = ['mobile', 'smarttv', 'wearable'];
const parser = new UAParser();
const browser = parser.getBrowser();
const device = parser.getDevice();

export const shareStatus = (
  guesses: string[],
  lost: boolean,
  isHardMode: boolean,
  isDarkMode: boolean,
  isHighContrastMode: boolean,
  handleShare: (result: string) => void
) => {
  const textToShare =
    `${t('SHARE_TITLE')}\n` +
    `${dayIndex} ${lost ? 'X' : guesses.length}/${MAX_CHALLENGES}${
      isHardMode ? '*' : ''
    }\n\n` +
    generateEmojiGrid(guesses, getEmojiTiles(isDarkMode, isHighContrastMode));
  const urlToShare = 'https://quettale.vercel.app';

  const shareData = { text: textToShare, url: urlToShare };

  let shareSuccess = 'failed';

  try {
    if (attemptShare(shareData)) {
      navigator.share(shareData).then(() => {
        shareSuccess = 'shared';
      });
    }
  } catch (error) {
    shareSuccess = 'failed';
  }

  if (shareSuccess === 'failed') {
    navigator.clipboard
      .writeText(`${textToShare}\n\n${urlToShare}`)
      .then(() => (shareSuccess = 'copied'))
      .catch(() => (shareSuccess = 'failed'));
  }

  handleShare(shareSuccess);
};

export const generateEmojiGrid = (guesses: string[], tiles: string[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess);
      const splitGuess = unicodeSplit(guess);

      return splitGuess
        .map((_, i) => {
          switch (status[i]) {
            case 'correct':
              return tiles[0];
            case 'present':
              return tiles[1];
            default:
              return tiles[2];
          }
        })
        .join('');
    })
    .join('\n');
};

const attemptShare = (shareData: object) => {
  return (
    // Deliberately exclude Firefox Mobile, because its Web Share API isn't working correctly
    browser.name?.toUpperCase().indexOf('FIREFOX') === -1 &&
    webShareApiDeviceTypes.indexOf(device.type ?? '') !== -1 &&
    navigator.canShare &&
    navigator.canShare(shareData) &&
    navigator.share &&
    // also on Windows
    navigator.userAgent.indexOf('indows') === -1
  );
};

const getEmojiTiles = (isDarkMode: boolean, isHighContrastMode: boolean) => {
  let tiles: string[] = [];
  tiles.push(isHighContrastMode ? '🟧' : '🟩');
  tiles.push(isHighContrastMode ? '🟦' : '🟨');
  tiles.push(isDarkMode ? '⬛' : '⬜');
  return tiles;
};
