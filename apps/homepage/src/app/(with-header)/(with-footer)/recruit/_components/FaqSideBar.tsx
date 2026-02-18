'use client';

import clsx from 'clsx';
import {FAQ_NAV_ITEMS} from '@/constants/faq/faq';
import {faqParametersType} from '@/schemas/faq/faq.schema';

interface FaqSideBarProps {
  ActivatedMenu: faqParametersType;
  onActive: (faqParameters: faqParametersType) => void;
}

export const FaqSideBar = ({ActivatedMenu, onActive}: FaqSideBarProps) => {
  return (
    <nav>
      <ul className='flex flex-col gap-2.5'>
        {FAQ_NAV_ITEMS.map(({label, dataKey}) => {
          return (
            <li
              key={label}
              onClick={() => onActive(dataKey as faqParametersType)}>
              <p
                className={clsx(
                  'text-h5 w-45.25 cursor-pointer rounded-[5px] px-2 py-1.25 transition-colors duration-300',
                  dataKey === ActivatedMenu
                    ? 'bg-neutral-800 text-neutral-100'
                    : 'text-neutral-800'
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
