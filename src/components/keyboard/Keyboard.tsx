import { getStatuses } from '../../lib/statuses';
import { Key } from './Key';
import { useEffect } from 'react';
import { localeAwareUpperCase } from '../../lib/words';
import { useTranslation } from 'react-i18next';

type Props = {
  onChar: (value: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  guesses: string[];
  isRevealing?: boolean;
};

export const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  guesses,
  isRevealing,
}: Props) => {
  const charStatuses = getStatuses(guesses);

  const onClick = (value: string) => {
    if (value === 'ENTER') {
      onEnter();
    } else if (value === 'DELETE') {
      onDelete();
    } else {
      onChar(value);
    }
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter();
      } else if (e.code === 'Backspace') {
        onDelete();
      } else {
        const key = localeAwareUpperCase(e.key);
        // TODO: check this test if the range works with non-english letters
        if (key.length === 1 && key >= 'A' && key <= 'Z') {
          onChar(key);
        }
      }
    };
    window.addEventListener('keyup', listener);
    return () => {
      window.removeEventListener('keyup', listener);
    };
  }, [onEnter, onDelete, onChar]);

  const { t } = useTranslation();

  return (
    <div>
      <div className="flex justify-center mb-1">
        {['Á', 'É', 'Í', 'Ó', 'Ú'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="flex justify-center mb-1">
        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="flex justify-center mb-1">
        {['A', 'S', 'D', 'F', 'G', 'H', '', 'C', 'L'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Key width={65.4} value="ENTER" onClick={onClick}>
          {t('TEXT_ENTER')}
        </Key>
        {['', 'X', 'C', 'V', 'B', 'N', 'M'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
        <Key width={65.4} value="DELETE" onClick={onClick}>
          {t('TEXT_DELETE')}
        </Key>
      </div>
    </div>
  );
};
