'use client';

import clsx from 'clsx';
import {FAQ_NAV_ITEMS} from '@/constants/faq/faq';
import {faqParametersType} from '@/schemas/faq/faq.schema';

interface FaqSideBarProps {
  activatedMenu: faqParametersType;
  onActive: (faqParameters: faqParametersType) => void;
}

export const FaqSideBar = ({activatedMenu, onActive}: FaqSideBarProps) => {
  return (
    <nav>
      <ul className='flex flex-wrap gap-2.5 lg:flex-col'>
        {FAQ_NAV_ITEMS.map(({label, dataKey}) => {
          return (
            <li
              role='button'
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onActive(dataKey as faqParametersType);
                }
              }}
              key={label}
              onClick={() => onActive(dataKey as faqParametersType)}>
              <p
                className={clsx(
                  'text-h5 w-36 cursor-pointer rounded-[5px] px-2 py-1.25 transition-colors duration-300 lg:w-45.25',
                  dataKey === activatedMenu
                    ? 'bg-neutral-800 text-neutral-100'
                    : 'bg-neutral-50 text-neutral-800 lg:bg-transparent'
                )}>
                {label}
              </p>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
