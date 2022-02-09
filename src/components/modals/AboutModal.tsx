import { BaseModal } from './BaseModal';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="이 게임은" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        {/* This is an open source version of the word guessing game we all know and
        love -{' '}
        <a
          href="https://github.com/cwackerfuss/react-wordle"
          className="underline font-bold"
        >
          check out the code here
        </a> */}
        <a
          href="https://vrisel.vercel.app/"
          className="underline font-bold"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vrisel
        </a>
        이{' '}
        <a
          href="https://www.hannahmariepark.com/"
          className="underline font-bold"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          Hannah Park
        </a>
        의 소스를 클론하여 만든 퀘냐 워들(Wordle)입니다.{' '}
        <a
          href="https://github.com/cwackerfuss/react-wordle"
          className="underline font-bold"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          Hannah의 원본 소스
        </a>
        를 확인하거나,{' '}
        <a
          href="https://www.powerlanguage.co.uk/wordle/"
          className="underline font-bold"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          원조 워들
        </a>
        도 해보세요!
        <br />
        퀘냐 단어는{' '}
        <a
          href="https://folk.uib.no/hnohf/"
          className="underline font-bold"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          Ardalambion
        </a>
        에서 수집하였습니다.
      </p>
    </BaseModal>
  );
};
