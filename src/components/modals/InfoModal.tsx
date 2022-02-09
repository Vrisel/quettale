import { MAX_CHALLENGES } from '../../constants/settings';
import { Cell } from '../grid/Cell';
import { BaseModal } from './BaseModal';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="게임방법" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        {/* Guess the word in 6 tries. After each guess, the color of the tiles will
        change to show how close your guess was to the word. */}
        최대 {MAX_CHALLENGES}번의 시도 안에 단어를 맞혀보세요. 시도할 때마다 각
        칸의 색으로 정답에 얼마나 근접했는지를 알려드립니다.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="E" status="correct" />
        <Cell value="N" />
        <Cell value="D" />
        <Cell value="O" />
        <Cell value="R" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        {/* The letter E is in the word and in the correct spot. */}
        E가 단어 내 동일한 자리에 존재합니다.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="Y" />
        <Cell value="U" />
        <Cell value="L" status="present" />
        <Cell value="M" />
        <Cell value="A" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        {/* The letter L is in the word but in the wrong spot. */}
        L이 단어 내에 존재하지만 위치가 틀렸습니다.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="M" />
        <Cell value="Á" />
        <Cell value="R" />
        <Cell value="I" status="absent" />
        <Cell value="E" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        {/* The letter I is not in the word in any spot. */}
        I는 단어 내에 존재하지 않습니다.
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-300 mt-4">
        자세한 퀘냐 규칙은{' '}
        <a
          href="https://github.com/Vrisel/quettale#Quenya"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold"
        >
          여기서 확인해보세요!
        </a>
      </p>
    </BaseModal>
  );
};
