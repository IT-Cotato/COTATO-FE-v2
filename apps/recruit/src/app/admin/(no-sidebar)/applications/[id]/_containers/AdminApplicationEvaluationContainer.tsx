'use client';

import {EvaluationTextarea} from '@/app/admin/(no-sidebar)/applications/[id]/_components/EvaluationTextArea';
import {EVALUATOR_TABS} from '@/constants/admin/admin-applications';
import {useAdminApplicationEvaluation} from '@/hooks/queries/useAdminApplication.query';
import {EvaluatorType} from '@/schemas/admin/admin-application.schema';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useRef} from 'react';
import clsx from 'clsx';

const DEFAULT_EVALUATOR: EvaluatorType = 'STAFF1';

interface AdminApplicationEvaluationContainerProps {
  applicationId: number;
}

export const AdminApplicationEvaluationContainer = ({
  applicationId,
}: AdminApplicationEvaluationContainerProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const evaluator =
    (searchParams.get('evaluator') as EvaluatorType) ?? DEFAULT_EVALUATOR;

  const evaluatorRef = useRef<EvaluatorType>(evaluator);

  useEffect(() => {
    const reviewer = searchParams.get('evaluator');
    if (!reviewer) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('evaluator', DEFAULT_EVALUATOR);
      router.replace(`?${params.toString()}`, {scroll: false});
    }
  }, [router, searchParams]);

  useEffect(() => {
    evaluatorRef.current = evaluator;
  }, [evaluator]);

  const {data: evaluation} = useAdminApplicationEvaluation({
    applicationId,
    evaluatorType: evaluator,
  });

  const handleEvaluatorClick = (reviewer: EvaluatorType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('evaluator', reviewer);
    router.push(`?${params.toString()}`, {scroll: false});
  };

  return (
    <div className='flex w-full flex-col gap-2.5'>
      <div className='flex gap-5 sm:gap-10'>
        {EVALUATOR_TABS.map(({label, value}) => {
          const isActive = evaluator === value;
          return (
            <button
              key={value}
              onClick={() => handleEvaluatorClick(value)}
              className={clsx(
                'flex h-10 min-w-12.5 items-center justify-center transition-colors',
                'text-body-m sm:text-h5',
                isActive
                  ? 'font-bold text-neutral-800'
                  : 'font-medium text-neutral-400',
                'bg-white hover:text-neutral-600'
              )}>
              {label}
            </button>
          );
        })}
      </div>

      <EvaluationTextarea
        key={evaluator}
        evaluator={evaluator}
        evaluation={evaluation}
        applicationId={applicationId}
      />
    </div>
  );
};
