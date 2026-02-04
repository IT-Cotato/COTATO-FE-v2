'use client';

import PlusIcon from '@/assets/icons/plus.svg';
import MinusIcon from '@/assets/icons/minus.svg';
import {useState} from 'react';
import clsx from 'clsx';
import {faqType} from '@/schemas/faq/faq.schema';

interface FaqAccordionProps {
  item: faqType;
}

export const FaqAccordion = ({item}: FaqAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      type='button'
      onClick={() => setIsOpen(!isOpen)}
      className={clsx(
        'flex w-full cursor-pointer flex-col self-stretch rounded-[10px] px-5.5 py-2.5 shadow-[0_6px_15px_0_rgba(0,0,0,0.10)] transition-colors duration-300',
        isOpen ? 'bg-white' : 'bg-neutral-200'
      )}>
      <div className='flex w-full items-center justify-between self-stretch'>
        <p
          className={clsx(
            'text-h5 transition-colors duration-300',
            isOpen ? 'text-neutral-800' : 'text-neutral-600'
          )}>
          {item.question}
        </p>

        <div className='relative h-6 w-6'>
          <PlusIcon
            aria-hidden={isOpen}
            className={clsx(
              'absolute inset-0 h-6 w-6 transition-all duration-300',
              isOpen ? 'opacity-0' : 'opacity-100'
            )}
          />
          <MinusIcon
            aria-hidden={!isOpen}
            className={clsx(
              'absolute inset-0 h-6 w-6 transition-all duration-300',
              isOpen ? 'rotate-0 opacity-100' : 'opacity-0'
            )}
          />
        </div>
      </div>

      <div
        className={clsx(
          'grid transition-all duration-300',
          isOpen
            ? 'grid-rows-[1fr] pt-5 opacity-100'
            : 'grid-rows-[0fr] pt-0 opacity-0'
        )}>
        <p className='text-body-l overflow-hidden text-start font-normal text-neutral-600'>
          {item.answer}
        </p>
      </div>
    </button>
  );
};
