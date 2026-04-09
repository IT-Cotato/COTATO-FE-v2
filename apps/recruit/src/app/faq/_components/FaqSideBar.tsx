'use client';

import type {Metadata} from 'next';
import {FAQ_NAV_ITEMS} from '@/constants/faq/faq';
import clsx from 'clsx';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';

export const metadata: Metadata = {
  title: 'FAQ | COTATO',
  description: 'COTATO와 함께할 여정에 대한 자주 묻는 질문들을 확인하세요.',
  openGraph: {
    title: 'FAQ | COTATO',
    description: 'COTATO와 함께할 여정에 대한 자주 묻는 질문들을 확인하세요.',
  },
};

export const FaqSideBar = () => {
  const searchParams = useSearchParams();

  return (
    <nav className='w-62.5 shrink-0 bg-neutral-50 px-6.25 py-12.5'>
      <ul className='flex flex-col gap-2.5'>
        {FAQ_NAV_ITEMS.map(({label, searchParams: part}) => {
          const isActive =
            searchParams.get('faq') === part ||
            (!searchParams.get('faq') && part === 'common');

          return (
            <li key={part}>
              <Link
                href={{
                  pathname: '/faq',
                  query: {faq: part},
                }}
                scroll={false}
                aria-current={isActive ? 'page' : undefined}>
                <p
                  className={clsx(
                    'text-h5 w-45.25 rounded-[5px] px-2 py-1.25 transition-colors duration-300',
                    isActive
                      ? 'bg-neutral-800 text-neutral-100'
                      : 'text-neutral-800'
                  )}>
                  {label}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
