'use client';

import {PART_TABS} from '@/constants/admin/admin-application-form';
import {mockApplications} from '@/mocks/mock-application';
import {useParams} from 'next/navigation';

export const ApplicationDetailHeader = () => {
  const params = useParams();
  const id = params.id as string;

  const application = mockApplications.find((item) => item.id === Number(id));

  /** TODO: 지원서 id 오류시 예외처리 */
  if (!application) return null;

  return (
    <header>
      <h1 className='flex gap-5 text-h1 font-bold'>
        <p className='text-neutral-600'>🥔 13기 </p>
        <p className='text-neutral-800'>
          {PART_TABS.find((tab) => tab.value === application.part)?.label ??
            '-'}
        </p>
        <p className='text-neutral-800'> {application.name}</p>
        <p className='text-neutral-600'>지원서 🥔</p>
      </h1>
    </header>
  );
};
