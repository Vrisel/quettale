import {
  InformationCircleIcon,
  ChartBarIcon,
  SunIcon,
  MoonIcon,
  GlobeAltIcon,
} from '@heroicons/react/outline';
import { useState, useEffect } from 'react';
import { Alert } from './components/alerts/Alert';
import { Grid } from './components/grid/Grid';
import { Keyboard } from './components/keyboard/Keyboard';
import { AboutModal } from './components/modals/AboutModal';
import { InfoModal } from './components/modals/InfoModal';
import { StatsModal } from './components/modals/StatsModal';
import {
  MAX_WORD_LENGTH,
  MAX_CHALLENGES,
  ALERT_TIME_MS,
  REVEAL_TIME_MS,
} from './constants/settings';
import { isWordValid, isWinningWord, solution } from './lib/words';
import { addStatsForCompletedGame, loadStats } from './lib/stats';
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from './lib/localStorage';

import './App.css';
import { useTranslation } from 'react-i18next';
import { Language } from './locales/i18n';

function App() {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  const [currentGuess, setCurrentGuess] = useState('');
  const [isGameWon, setIsGameWon] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isWordNotValidAlertOpen, setIsWordNotValidAlertOpen] = useState(false);
  const [isLetterUnusedAlertOpen, setIsLetterUnusedAlertOpen] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
      ? true
      : false
  );
  const [successAlert, setSuccessAlert] = useState('');
  const [isRevealing, setIsRevealing] = useState(false);
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage();
    if (loaded?.solution !== solution) {
      return [];
    }
    const gameWasWon = loaded.guesses.includes(solution);
    if (gameWasWon) {
      setIsGameWon(true);
    }
    if (loaded.guesses.length === MAX_CHALLENGES && !gameWasWon) {
      setIsGameLost(true);
    }
    return loaded.guesses;
  });

  const [stats, setStats] = useState(() => loadStats());

  const { t, i18n } = useTranslation();
  const handleChangeLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
  };

  document.title = t('GAME_TITLE');
  i18n.on('languageChanged', (lng) => {
    document.documentElement.setAttribute('lang', lng);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution });
  }, [guesses]);

  useEffect(() => {
    if (isGameWon) {
      setTimeout(() => {
        const messages = t('MESSAGES_WIN', { returnObjects: true });
        setSuccessAlert(messages[Math.floor(Math.random() * messages.length)]);

        setTimeout(() => {
          setSuccessAlert('');
          setIsStatsModalOpen(true);
        }, ALERT_TIME_MS);
      }, REVEAL_TIME_MS * MAX_WORD_LENGTH);
    }
    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true);
      }, ALERT_TIME_MS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameWon, isGameLost]);

  const onChar = (value: string) => {
    if (
      currentGuess.length <= MAX_WORD_LENGTH &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      const longVowel: { [index: string]: string } = {
        A: 'Á',
        E: 'É',
        I: 'Í',
        O: 'Ó',
        U: 'Ú',
      };
      if (value in longVowel && currentGuess.slice(-1) === value) {
        setCurrentGuess(`${currentGuess.slice(0, -1)}${longVowel[value]}`);
      } else if (currentGuess.slice(-1) === 'C' && value === 'S') {
        setCurrentGuess(`${currentGuess.slice(0, -1)}X`);
      } else if (currentGuess.slice(-1) === 'C' && value === 'W') {
        setCurrentGuess(`${currentGuess.slice(0, -1)}QU`);
      } else if (currentGuess.slice(-1) === 'T' && value === 'H') {
        setCurrentGuess(`${currentGuess.slice(0, -1)}S`);
      } else if (currentGuess.length < MAX_WORD_LENGTH) {
        if (['J', 'Z'].includes(value)) {
          setIsLetterUnusedAlertOpen(true);
          return setTimeout(() => {
            setIsLetterUnusedAlertOpen(false);
          }, ALERT_TIME_MS);
        } else {
          setCurrentGuess(`${currentGuess}${value === 'K' ? 'C' : value}`);
        }
      }
    }
  };

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return;
    }
    if (!(currentGuess.length === MAX_WORD_LENGTH)) {
      setIsNotEnoughLetters(true);
      return setTimeout(() => {
        setIsNotEnoughLetters(false);
      }, ALERT_TIME_MS);
    }

    if (!isWordValid(currentGuess)) {
      setIsWordNotValidAlertOpen(true);
      return setTimeout(() => {
        setIsWordNotValidAlertOpen(false);
      }, ALERT_TIME_MS);
    }

    setIsRevealing(true);
    // turn this back off after all
    // chars have been revealed
    setTimeout(() => {
      setIsRevealing(false);
    }, REVEAL_TIME_MS * MAX_WORD_LENGTH);

    const winningWord = isWinningWord(currentGuess);

    if (
      currentGuess.length === MAX_WORD_LENGTH &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess]);
      setCurrentGuess('');

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, guesses.length));
        return setIsGameWon(true);
      }

      if (guesses.length === MAX_CHALLENGES - 1) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1));
        setIsGameLost(true);
      }
    }
  };

  return (
    <>
      <div className="pt-2 pb-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex w-80 mx-auto items-center mb-8 mt-4">
          <h1 className="text-xl ml-2.5 grow font-bold dark:text-white">
            {t('GAME_TITLE')}
          </h1>
          <GlobeAltIcon
            className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
            onClick={() =>
              handleChangeLanguage(i18n.language === 'en' ? 'ko' : 'en')
            }
          />
          {isDarkMode ? (
            <SunIcon
              className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
              onClick={() => handleDarkMode(!isDarkMode)}
            />
          ) : (
            <MoonIcon
              className="h-6 w-6 mr-2 cursor-pointer"
              onClick={() => handleDarkMode(!isDarkMode)}
            />
          )}
          <InformationCircleIcon
            className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
            onClick={() => setIsInfoModalOpen(true)}
          />
          <ChartBarIcon
            className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
            onClick={() => setIsStatsModalOpen(true)}
          />
        </div>
        <Grid
          guesses={guesses}
          currentGuess={currentGuess}
          isRevealing={isRevealing}
        />
        <Keyboard
          onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
          guesses={guesses}
          isRevealing={isRevealing}
        />
        <InfoModal
          isOpen={isInfoModalOpen}
          handleClose={() => setIsInfoModalOpen(false)}
        />
        <StatsModal
          isOpen={isStatsModalOpen}
          handleClose={() => setIsStatsModalOpen(false)}
          guesses={guesses}
          gameStats={stats}
          isGameLost={isGameLost}
          isGameWon={isGameWon}
          handleShare={() => {
            setSuccessAlert(t('MESSAGE_GAME_COPIED'));
            return setTimeout(() => setSuccessAlert(''), ALERT_TIME_MS);
          }}
        />
        <AboutModal
          isOpen={isAboutModalOpen}
          handleClose={() => setIsAboutModalOpen(false)}
        />

        <button
          type="button"
          className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 select-none"
          onClick={() => setIsAboutModalOpen(true)}
        >
          {t('TEXT_ABOUT_GAME')}
        </button>

        <Alert
          message={t('MESSAGE_NOT_ENOUGH_LETTERS')}
          isOpen={isNotEnoughLetters}
        />
        <Alert
          message={t('MESSAGE_UNUSED_LETTER')}
          isOpen={isLetterUnusedAlertOpen}
        />
        <Alert
          message={t('MESSAGE_WORD_NOT_VALID')}
          isOpen={isWordNotValidAlertOpen}
        />
        <Alert
          message={t('MESSAGE_CORRECT_WORD', { solution })}
          isOpen={isGameLost}
        />
        <Alert
          message={successAlert}
          isOpen={successAlert !== ''}
          variant="success"
        />
      </div>
    </>
  );
}

export default App;
