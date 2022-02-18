import { GameStats } from '../../lib/localStorage';
import { useTranslation } from 'react-i18next';

type Props = {
  gameStats: GameStats;
};

const StatItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <div className="items-center justify-center m-1 w-1/4 dark:text-white">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-xs">{label}</div>
    </div>
  );
};

export const StatBar = ({ gameStats }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center my-2">
      <StatItem label={t('TEXT_TOTAL_TRIES')} value={gameStats.totalGames} />
      <StatItem
        label={t('TEXT_SUCCESS_RATE')}
        value={`${gameStats.successRate}%`}
      />
      <StatItem
        label={t('TEXT_CURRENT_STREAK')}
        value={gameStats.currentStreak}
      />
      <StatItem label={t('TEXT_BEST_STREAK')} value={gameStats.bestStreak} />
    </div>
  );
};
