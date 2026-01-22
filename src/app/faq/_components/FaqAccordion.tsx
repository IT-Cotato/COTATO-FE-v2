'use client';

import PlusIcon from '@/assets/icons/plus.svg';
import MinusIcon from '@/assets/icons/minus.svg';
import {useState} from 'react';
import clsx from 'clsx';

interface FaqAccordionProps {
  question: string;
  answer: string;
}

export const FaqAccordion = ({question, answer}: FaqAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={clsx(
        'flex w-full cursor-pointer flex-col gap-5 self-stretch rounded-[10px] px-5.5 py-2.5 shadow-[0_6px_15px_0_rgba(0,0,0,0.10)] transition-all duration-300',
        isOpen ? 'h-min bg-white' : 'h-min bg-neutral-200'
      )}>
      <div className='flex w-full items-center justify-between self-stretch'>
        <p
          className={clsx(
            'text-body-l-sb',
            isOpen ? 'text-neutral-800' : 'text-neutral-600'
          )}>
          {question}
        </p>
        {isOpen ? (
          <MinusIcon className='h-6 w-6 fill-neutral-600' />
        ) : (
          <PlusIcon className='h-6 w-6 fill-neutral-600' />
        )}
      </div>

      {isOpen && (
        <p className='self-stretch text-start text-body-m font-normal text-neutral-600'>
          {answer}
        </p>
      )}
    </button>
  );
};
