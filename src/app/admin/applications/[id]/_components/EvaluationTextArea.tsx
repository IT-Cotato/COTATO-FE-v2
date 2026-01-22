import {usePostAdminApplicationEvaluation} from '@/hooks/mutations/useAdminApplication.mutation';
import {useDebounce} from '@/hooks/useDebounce';
import {EvaluatorType} from '@/schemas/admin/admin-application.schema';
import {useEffect, useState} from 'react';

interface EvaluationTextAreaProps {
  evaluator: EvaluatorType;
  evaluation?: {data: {comment: string | null}};
  applicationId: number;
}

export const EvaluationTextarea = ({
  evaluator,
  evaluation,
  applicationId,
}: EvaluationTextAreaProps) => {
  const [draft, setDraft] = useState<string | null>(null);
  const debouncedDraft = useDebounce(draft, 500);
  const {mutate} = usePostAdminApplicationEvaluation(applicationId);

  useEffect(() => {
    if (!evaluation) return;
    if (debouncedDraft === null) return;

    const serverComment = evaluation.data.comment ?? '';
    if (debouncedDraft === serverComment) return;

    mutate({
      applicationId,
      body: {
        evaluatorType: evaluator,
        comment: debouncedDraft,
      },
    });
  }, [debouncedDraft, evaluation, evaluator, applicationId, mutate]);

  return (
    <textarea
      value={draft ?? evaluation?.data.comment ?? ''}
      onChange={(e) => setDraft(e.target.value)}
      placeholder='면접 질문 및 서류평가에 대해 자유롭게 작성해주세요.'
      className='min-h-100 w-full resize-none rounded-[10px] border-[1.5px] border-neutral-300 bg-white px-8 py-6.25 text-h5 outline-none placeholder:text-neutral-800'
    />
  );
};
