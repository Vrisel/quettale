import Countdown from 'react-countdown';
import { StatBar } from '../stats/StatBar';
import { Histogram } from '../stats/Histogram';
import { GameStats } from '../../lib/localStorage';
import { shareStatus } from '../../lib/share';
import { tomorrow } from '../../lib/words';
import { BaseModal } from './BaseModal';
import { useTranslation } from 'react-i18next';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  guesses: string[];
  gameStats: GameStats;
  isGameLost: boolean;
  isGameWon: boolean;
  handleShare: (result: string) => void;
  isHardMode: boolean;
};

export const StatsModal = ({
  isOpen,
  handleClose,
  guesses,
  gameStats,
  isGameLost,
  isGameWon,
  handleShare,
  isHardMode,
}: Props) => {
  const { t } = useTranslation();

  if (gameStats.totalGames <= 0) {
    return (
      <BaseModal
        title={t('MODAL_STATISTICS_TITLE')}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <StatBar gameStats={gameStats} />
      </BaseModal>
    );
  }
  return (
    <BaseModal
      title={t('MODAL_STATISTICS_TITLE')}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <StatBar gameStats={gameStats} />
      <h4 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
        {t('TEXT_GUESS_DISTRIBUTION')}
      </h4>
      <Histogram gameStats={gameStats} />
      {(isGameLost || isGameWon) && (
        <div className="mt-5 sm:mt-6 columns-2 dark:text-white">
          <div>
            <h5>{t('TEXT_NEW_WORD')}</h5>
            <Countdown
              className="text-lg font-medium text-gray-900 dark:text-gray-100"
              date={tomorrow}
              daysInHours={true}
            />
          </div>
          <button
            type="button"
            className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            onClick={() => {
              shareStatus(guesses, isGameLost, isHardMode).then((result) =>
                handleShare(result)
              );
              handleClose();
            }}
          >
            {t('TEXT_SHARE')}
          </button>
        </div>
      )}
    </BaseModal>
  );
};
