'use client';

import {Button} from '@/components/button/Button';
import {REVIEWER_TABS} from '@/constants/admin/admin-applications';
import {ReviewerType} from '@/schemas/admin-application-type';
import {useAdminReviewStore} from '@/store/useAdminReviewStore';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect} from 'react';

const DEFAULT_REVIEWER: ReviewerType = 'admin1';

export const AdminReviewTabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const reviews = useAdminReviewStore((state) => state.reviews);
  const setReview = useAdminReviewStore((state) => state.setReview);

  useEffect(() => {
    const reviewer = searchParams.get('reviewer');

    if (!reviewer) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('reviewer', DEFAULT_REVIEWER);

      router.replace(`?${params.toString()}`, {scroll: false});
    }
  }, [router, searchParams]);

  const activeReviewer =
    (searchParams.get('reviewer') as ReviewerType) ?? DEFAULT_REVIEWER;

  const handleReviewerClick = (reviewer: ReviewerType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('reviewer', reviewer);

    router.push(`?${params.toString()}`, {scroll: false});
  };

  return (
    <div className='flex w-full flex-col gap-7.75'>
      <div className='flex gap-17.5'>
        {REVIEWER_TABS.map(({label, value}) => {
          const isActive = activeReviewer === value;

          return (
            <Button
              key={value}
              label={label}
              labelTypo='h5'
              onClick={() => handleReviewerClick(value)}
              textColor={isActive ? 'neutral-800' : 'neutral-500'}
              backgroundColor='neutral-50'
              width='min-w-[50px]'
              height={40}
            />
          );
        })}
      </div>
      <textarea
        value={reviews[activeReviewer] ?? ''}
        onChange={(e) => setReview(activeReviewer, e.target.value)}
        placeholder='면접 질문 및 서류평가에 대해 자유롭게 작성해주세요.'
        className='min-h-100 w-full resize-none rounded-[10px] border-[1.5px] bg-white px-8 py-6.25 text-h5 placeholder:text-black'
      />
    </div>
  );
};
