import { MAX_CHALLENGES } from '../../constants/settings';
import { Cell } from '../grid/Cell';
import { BaseModal } from './BaseModal';
import { Trans, useTranslation } from 'react-i18next';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  const { t } = useTranslation();
  return (
    <BaseModal
      title={t('MODAL_INFO_TITLE')}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <p className="text-sm text-gray-500 dark:text-gray-300">
        <Trans i18nKey="TEXT_HOWTO">
          Max Challenges: {{ maxChallenges: MAX_CHALLENGES }}
        </Trans>
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="E"
          status="correct"
        />
        <Cell value="N" />
        <Cell value="D" />
        <Cell value="O" />
        <Cell value="R" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        <Trans i18nKey="TEXT_CORRECT">
          Correct letter: {{ correctLetter: 'E' }}
        </Trans>
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="Y" />
        <Cell value="U" />
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="L"
          status="present"
        />
        <Cell value="M" />
        <Cell value="A" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        <Trans i18nKey="TEXT_PRESENT">
          Present letter: {{ presentLetter: 'L' }}
        </Trans>
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="M" />
        <Cell value="Á" />
        <Cell value="R" />
        <Cell isRevealing={true} isCompleted={true} value="I" status="absent" />
        <Cell value="E" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        <Trans i18nKey="TEXT_ABSENT">
          Absent letter: {{ absentLetter: 'I' }}
        </Trans>
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-300 mt-4">
        <Trans i18nKey="TEXT_QUENYA">
          For more information of Quenya,{' '}
          <a
            href="https://github.com/Vrisel/quettale#Quenya"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-bold"
          >
            visit here.
          </a>
        </Trans>
      </p>

      {/* <p className="mt-6 italic text-sm text-gray-500 dark:text-gray-300">
        This is an open source version of the word guessing game we all know and
        love -{' '}
        <a
          href="https://github.com/cwackerfuss/react-wordle"
          className="underline font-bold"
        >
          check out the code here
        </a>{' '}
      </p> */}
    </BaseModal>
  );
};
