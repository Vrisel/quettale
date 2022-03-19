import {
  ChartBarIcon,
  CogIcon,
  GlobeAltIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline';
import { useTranslation } from 'react-i18next';

type Props = {
  gameTitle: string;
  setIsInfoModalOpen: (value: boolean) => void;
  toggleLocale: (lang: 'en' | 'ko') => void;
  setIsStatsModalOpen: (value: boolean) => void;
  setIsSettingsModalOpen: (value: boolean) => void;
};

export const Navbar = ({
  gameTitle,
  setIsInfoModalOpen,
  toggleLocale,
  setIsStatsModalOpen,
  setIsSettingsModalOpen,
}: Props) => {
  const { i18n } = useTranslation();
  return (
    <div className="navbar">
      <div className="navbar-content px-5">
        <InformationCircleIcon
          className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
          onClick={() => setIsInfoModalOpen(true)}
        />
        <p className="text-xl ml-2.5 font-bold dark:text-white">{gameTitle}</p>
        <div className="right-icons">
          <GlobeAltIcon
            className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
            onClick={() => toggleLocale(i18n.language === 'en' ? 'ko' : 'en')}
          />
          <ChartBarIcon
            className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
            onClick={() => setIsStatsModalOpen(true)}
          />
          <CogIcon
            className="h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsSettingsModalOpen(true)}
          />
        </div>
      </div>
      <hr></hr>
    </div>
  );
};
