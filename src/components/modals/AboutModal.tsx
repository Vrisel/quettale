import { Trans, useTranslation } from 'react-i18next';
import { BaseModal } from './BaseModal';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  const { t } = useTranslation();
  return (
    <BaseModal
      title={t('MODAL_ABOUT_TITLE')}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <p className="text-sm text-gray-500 dark:text-gray-300">
        {/* This is an open source version of the word guessing game we all know and
        love -{' '}
        <a
          href="https://github.com/cwackerfuss/react-wordle"
          className="underline font-bold"
        >
          check out the code here
        </a> */}
        <Trans i18nKey="TEXT_INTRODUCTION">
          Original author:{' '}
          <a
            href="https://www.hannahmariepark.com/"
            className="underline font-bold"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {{ originalAuthor: 'Hannah Park' }}
          </a>
          Author:{' '}
          <a
            href="https://vrisel.vercel.app/"
            className="underline font-bold"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ author: 'Vrisel' }}
          </a>
        </Trans>
        <br />
        <Trans i18nKey="TEXT_ORIGINAL">
          Check{' '}
          <a
            href="https://github.com/cwackerfuss/react-wordle"
            className="underline font-bold"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {{ originalAuthor: 'Hannah' }}'s original source
          </a>
          , or play{' '}
          <a
            href="https://www.powerlanguage.co.uk/wordle/"
            className="underline font-bold"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            original Wordle
          </a>
        </Trans>
        <br />
        <Trans i18nKey="TEXT_COPULA">
          Copula from:{' '}
          <a
            href="https://folk.uib.no/hnohf/"
            className="underline font-bold"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {{ Ardalambion: 'Ardalambion' }}
          </a>
        </Trans>
      </p>
    </BaseModal>
  );
};
