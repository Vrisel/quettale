import {
  InformationCircleIcon,
  ChartBarIcon,
  GlobeAltIcon,
  CogIcon,
} from '@heroicons/react/outline';
import { useState, useEffect } from 'react';
import { AlertContainer } from './components/alerts/AlertContainer';
import { useAlert } from './context/AlertContext';
import { Grid } from './components/grid/Grid';
import { Keyboard } from './components/keyboard/Keyboard';
import { AboutModal } from './components/modals/AboutModal';
import { InfoModal } from './components/modals/InfoModal';
import { StatsModal } from './components/modals/StatsModal';
import { SettingsModal } from './components/modals/SettingsModal';
import {
  MAX_WORD_LENGTH,
  MAX_CHALLENGES,
  ALERT_TIME_MS,
  REVEAL_TIME_MS,
  GAME_LOST_INFO_DELAY,
} from './constants/settings';
import {
  isWordValid,
  isWinningWord,
  solution,
  findFirstUnusedReveal,
} from './lib/words';
import { addStatsForCompletedGame, loadStats } from './lib/stats';
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
  setStoredIsHighContrastMode,
  getStoredIsHighContrastMode,
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
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [currentRowClass, setCurrentRowClass] = useState('');
  const [isGameLost, setIsGameLost] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
      ? true
      : false
  );
  const { showError: showErrorAlert, showSuccess: showSuccessAlert } =
    useAlert();
  const [isHighContrastMode, setIsHighContrastMode] = useState(
    getStoredIsHighContrastMode()
  );
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
      showErrorAlert(t('MESSAGE_CORRECT_WORD', { solution }), {
        persist: true,
      });
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

  const [isHardMode, setIsHardMode] = useState(
    localStorage.getItem('gameMode')
      ? localStorage.getItem('gameMode') === 'hard'
      : false
  );

  useEffect(() => {
    // if no game state on load,
    // show the user the how-to info modal
    if (!loadGameStateFromLocalStorage()) {
      setIsInfoModalOpen(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    if (isHighContrastMode) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [isDarkMode, isHighContrastMode]);

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  const handleHardMode = (isHard: boolean) => {
    if (guesses.length === 0 || localStorage.getItem('gameMode') === 'hard') {
      setIsHardMode(isHard);
      localStorage.setItem('gameMode', isHard ? 'hard' : 'normal');
    } else {
      showErrorAlert(t('MESSAGE_HARD_MODE_ALERT'));
    }
  };

  const handleHighContrastMode = (isHighContrast: boolean) => {
    setIsHighContrastMode(isHighContrast);
    setStoredIsHighContrastMode(isHighContrast);
  };

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution });
  }, [guesses]);

  useEffect(() => {
    if (isGameWon) {
      const messages = t('MESSAGES_WIN', { returnObjects: true });
      const winMessage = messages[Math.floor(Math.random() * messages.length)];
      const delayMs = REVEAL_TIME_MS * MAX_WORD_LENGTH;
      showSuccessAlert(winMessage, {
        delayMs,
        onClose: () => setIsStatsModalOpen(true),
      });
    }

    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true);
      }, GAME_LOST_INFO_DELAY);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameWon, isGameLost, showSuccessAlert]);

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
          showErrorAlert(t('MESSAGE_UNUSED_LETTER'));
          setCurrentRowClass('jiggle');
          return setTimeout(() => {
            setCurrentRowClass('');
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
      showErrorAlert(t('MESSAGE_NOT_ENOUGH_LETTERS'));
      setCurrentRowClass('jiggle');
      return setTimeout(() => {
        setCurrentRowClass('');
      }, ALERT_TIME_MS);
    }

    if (!isWordValid(currentGuess)) {
      showErrorAlert(t('MESSAGE_WORD_NOT_VALID'));
      setCurrentRowClass('jiggle');
      return setTimeout(() => {
        setCurrentRowClass('');
      }, ALERT_TIME_MS);
    }

    // enforce hard mode - all guesses must contain all previously revealed letters
    if (isHardMode) {
      const firstMissingReveal = findFirstUnusedReveal(currentGuess, guesses);
      if (firstMissingReveal) {
        showErrorAlert(firstMissingReveal);
        setCurrentRowClass('jiggle');
        return setTimeout(() => {
          setCurrentRowClass('');
        }, ALERT_TIME_MS);
      }
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
        showErrorAlert(t('MESSAGE_CORRECT_WORD', { solution }), {
          persist: true,
          delayMs: REVEAL_TIME_MS * MAX_WORD_LENGTH + 1,
        });
      }
    }
  };

  return (
    <div className="pt-2 pb-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex w-80 mx-auto items-center mb-8 mt-20">
        <h1 className="text-xl ml-2.5 grow font-bold dark:text-white">
          {t('GAME_TITLE')}
        </h1>
        <InformationCircleIcon
          className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
          onClick={() => setIsInfoModalOpen(true)}
        />
        <GlobeAltIcon
          className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
          onClick={() =>
            handleChangeLanguage(i18n.language === 'en' ? 'ko' : 'en')
          }
        />
        <ChartBarIcon
          className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
          onClick={() => setIsStatsModalOpen(true)}
        />
        <CogIcon
          className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
          onClick={() => setIsSettingsModalOpen(true)}
        />
      </div>
      <Grid
        guesses={guesses}
        currentGuess={currentGuess}
        isRevealing={isRevealing}
        currentRowClassName={currentRowClass}
      />
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
        isRevealing={isRevealing}
      />
      <button
        type="button"
        className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 select-none"
        onClick={() => setIsAboutModalOpen(true)}
      >
        {t('TEXT_ABOUT_GAME')}
      </button>
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
        isHardMode={isHardMode}
        handleShare={(result: string) => {
          switch (result) {
            case 'copied':
              return showSuccessAlert(t('MESSAGE_GAME_COPIED'));
            case 'shared':
              return showSuccessAlert(t('MESSAGE_GAME_SHARED'));
            case 'failed':
              return showErrorAlert(t('MESSAGE_GAME_SHARE_FAILED'));
            default:
              return;
          }
        }}
      />
      <SettingsModal
        isOpen={isSettingsModalOpen}
        handleClose={() => setIsSettingsModalOpen(false)}
        isHardMode={isHardMode}
        handleHardMode={handleHardMode}
        isDarkMode={isDarkMode}
        handleDarkMode={handleDarkMode}
        isHighContrastMode={isHighContrastMode}
        handleHighContrastMode={handleHighContrastMode}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
      />

      <AlertContainer />
    </div>
  );
}

export default App;
