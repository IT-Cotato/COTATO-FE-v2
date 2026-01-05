'use client';

import type {Metadata} from 'next';
import {FAQ_NAV_ITEMS} from '@/constants/faq/faq-sidebar';
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
    <nav>
      <ul className='flex w-62.5 flex-col gap-2.5'>
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
                aria-current={isActive ? 'page' : undefined}
                className={clsx(
                  'flex items-center rounded-[10px] p-2 text-body-m font-normal transition-colors',
                  isActive && 'bg-neutral-800 text-neutral-100'
                )}>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default FaqSideBar;
