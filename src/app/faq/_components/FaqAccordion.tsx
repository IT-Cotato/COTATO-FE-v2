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
        'flex w-full cursor-pointer flex-col self-stretch rounded-[10px] px-5.5 py-2.5 shadow-[0_6px_15px_0_rgba(0,0,0,0.10)] transition-colors duration-300',
        isOpen ? 'bg-white' : 'bg-neutral-200'
      )}>
      <div className='flex w-full items-center justify-between self-stretch'>
        <p
          className={clsx(
            'text-body-l-sb transition-colors duration-300',
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

      <div
        className={clsx(
          'grid transition-all duration-300',
          isOpen
            ? 'grid-rows-[1fr] pt-5 opacity-100'
            : 'grid-rows-[0fr] pt-0 opacity-0'
        )}>
        <p className='overflow-hidden text-start text-body-m font-normal text-neutral-600'>
          {answer}
        </p>
      </div>
    </button>
  );
};
