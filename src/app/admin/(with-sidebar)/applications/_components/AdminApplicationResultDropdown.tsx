import {ApplicationResultType} from '@/schemas/admin/admin-application-type';
import ChevronDown from '@/assets/chevrons/chevron-down.svg';
import {useRef, useState} from 'react';
import {RESULT_OPTIONS} from '@/constants/admin/admin-applications';
import clsx from 'clsx';
import {useClickOutside} from '@/hooks/useClickOutside';

interface AdminApplicationResultDropdownProps {
  result?: ApplicationResultType;
}

export const AdminApplicationResultDropdown = ({
  result = '평가전',
}: AdminApplicationResultDropdownProps) => {
  const [selectedResult, setSelectedResult] =
    useState<ApplicationResultType>(result);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const {bg} = RESULT_STYLE_MAP[selectedResult];

  const handleSelect = (value: ApplicationResultType) => {
    setSelectedResult(value);
    setIsOpen(false);

    // TODO: 합격 결과 변경 API 호출
  };

  useClickOutside(wrapperRef, () => {
    setIsOpen(false);
  });

  return (
    <div className='relative w-18.75' ref={wrapperRef}>
      <button
        type='button'
        className={`inline-flex w-full items-center justify-center gap-1 rounded-[10px] py-1.5 text-body-s text-white ${bg}`}
        onClick={() => setIsOpen((prev) => !prev)}>
        <span>{selectedResult}</span>
        <ChevronDown
          className={`text-white transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <ul className='absolute top-full z-10 mt-1 w-full rounded-sm bg-neutral-700 text-body-s text-neutral-300 shadow-lg'>
          {RESULT_OPTIONS.map((option) => {
            const isSelected = option === selectedResult;

            return (
              <li
                key={option}
                className={clsx(
                  'cursor-pointer px-3 py-1.5 text-center',
                  isSelected ? 'text-primary' : 'hover:text-primary'
                )}
                onClick={() => handleSelect(option)}>
                {option}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const RESULT_STYLE_MAP: Record<ApplicationResultType, {bg: string}> = {
  합격: {
    bg: 'bg-[#68CA3A]',
  },
  불합격: {
    bg: 'bg-alert',
  },
  예비합격: {
    bg: 'bg-hover',
  },
  평가전: {
    bg: 'bg-text-disabled',
  },
};
