'use client';

import {EvaluationTextarea} from '@/app/admin/(no-sidebar)/applications/[id]/_components/EvaluationTextArea';
import {Button} from '@/components/button/Button';
import {EVALUATOR_TABS} from '@/constants/admin/admin-applications';
import {useAdminApplicationEvaluation} from '@/hooks/queries/useAdminApplication.query';
import {EvaluatorType} from '@/schemas/admin/admin-application.schema';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useRef} from 'react';

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
    <div className='flex w-full flex-col gap-7.75'>
      <div className='flex gap-17.5'>
        {EVALUATOR_TABS.map(({label, value}) => {
          const isActive = evaluator === value;
          return (
            <Button
              key={value}
              label={label}
              labelTypo='h5'
              onClick={() => handleEvaluatorClick(value)}
              textColor={isActive ? 'neutral-800' : 'neutral-500'}
              backgroundColor='neutral-50'
              width='min-w-[50px]'
              height={40}
            />
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
