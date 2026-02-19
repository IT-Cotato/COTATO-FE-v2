'use client';

import Collaboration from '@/assets/home/core-value/collaboration.svg';
import Ownership from '@/assets/home/core-value/ownership.svg';
import Growth from '@/assets/home/core-value/growth.svg';
import {HomeSectionHeader} from '@/app/(with-header)/(with-footer)/(home)/_components/HomeSectionHeader';

export const HomeCoreValue = () => {
  const items = [
    {
      defaultIcon: Collaboration,
      title: 'Code Together',
      desc: '함께 성장하는 협업',
    },
    {
      defaultIcon: Ownership,
      title: 'Own the Trip',
      desc: '주도적으로 만들어가는 여정',
    },
    {
      defaultIcon: Growth,
      title: 'Arrive Together',
      desc: '함께 도전하며 도착하는 경험',
    },
  ];

  return (
    <section
      className='flex scroll-mt-40 flex-col gap-17.5'
      aria-labelledby='core-value'
      id='core-value'>
      <HomeSectionHeader mainHeading='Core Value' subHeading='핵심 가치' />

      <ul className='flex flex-row gap-7.5' role='list'>
        {items.map((item, idx) => {
          const DefaultIcon = item.defaultIcon;

          return (
            <li key={idx} className='flex flex-col items-center'>
              <div className='relative h-auto w-auto'>
                <DefaultIcon />
              </div>
              <div className='mt-3 flex flex-col items-center gap-3'>
                <strong className='text-h3 font-bold text-neutral-600'>
                  {item.title}
                </strong>
                <p className='text-h5 text-neutral-400'>{item.desc}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
