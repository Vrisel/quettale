import { useTranslation } from 'react-i18next';
import { BaseModal } from './BaseModal';
import { SettingsToggle } from './SettingsToggle';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  isHardMode: boolean;
  handleHardMode: Function;
  isDarkMode: boolean;
  handleDarkMode: Function;
  isHighContrastMode: boolean;
  handleHighContrastMode: Function;
};

export const SettingsModal = ({
  isOpen,
  handleClose,
  isHardMode,
  handleHardMode,
  isDarkMode,
  handleDarkMode,
  isHighContrastMode,
  handleHighContrastMode,
}: Props) => {
  const { t } = useTranslation();
  return (
    <BaseModal
      title={t('MODAL_SETTINGS_TITLE')}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <div className="grid-cols-2 gap-4">
        <SettingsToggle
          settingName={t('TEXT_HARD_MODE')}
          flag={isHardMode}
          handleFlag={handleHardMode}
        />
        <SettingsToggle
          settingName={t('TEXT_DARK_MODE')}
          flag={isDarkMode}
          handleFlag={handleDarkMode}
        />
        <SettingsToggle
          settingName={t('TEXT_HIGH_CONTRAST_MODE')}
          flag={isHighContrastMode}
          handleFlag={handleHighContrastMode}
        />
      </div>
    </BaseModal>
  );
};
