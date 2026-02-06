import {FullButton} from '@repo/ui/components/buttons/FullButton';
import {FormTextarea} from '@repo/ui/components/form/FormTextarea';
import {PartQuestionWithAnswerType} from '@/schemas/admin/admin-application.schema';
import {FormLink} from '@repo/ui/components/form/FormLink';

interface PartQuestionViewProps {
  onNext: () => void;
  onPrev: () => void;
  questionsWithAnswers: PartQuestionWithAnswerType[];
  pdfFileUrl: string | null | undefined;
}

export const PartQuestionView = ({
  onNext,
  onPrev,
  questionsWithAnswers,
  pdfFileUrl,
}: PartQuestionViewProps) => {
  if (questionsWithAnswers.length === 0) {
    return (
      <div className='flex flex-col gap-10'>
        <p className='text-h5 text-center text-neutral-400'>
          등록된 파트 질문이 없습니다.
        </p>
        <div className='flex flex-row gap-7.5'>
          <FullButton
            label='이전'
            labelTypo='h4'
            backgroundColor='neutral-600'
            onClick={onPrev}
            height={54}
          />
          <FullButton
            label='다음'
            labelTypo='h4'
            onClick={onNext}
            height={54}
          />
        </div>
      </div>
    );
  }
  /** 포트폴리오 질문 확인용 변수 */
  const lastSequence =
    questionsWithAnswers[questionsWithAnswers.length - 1]?.sequence;

  return (
    <div className='flex flex-col gap-10'>
      {questionsWithAnswers.map((data) => {
        const isLastQuestion = data.sequence === lastSequence;

        return (
          <div key={data.sequence} className='flex flex-col gap-5'>
            {isLastQuestion ? (
              pdfFileUrl ? (
                <FormLink
                  label={`${data.sequence}. ${data.questionContent}`}
                  readOnly
                  value={[pdfFileUrl]}
                />
              ) : (
                <p className='text-h5 flex justify-center text-neutral-400'>
                  첨부된 포트폴리오가 없습니다.
                </p>
              )
            ) : (
              <FormTextarea
                label={`${data.sequence}. ${data.questionContent}`}
                readOnly
                value={data.content ?? ''}
                maxLength={data.maxLength}
                currentLength={data.length}
              />
            )}
          </div>
        );
      })}

      <div className='flex flex-row gap-7.5'>
        <FullButton
          label='이전'
          labelTypo='h4'
          backgroundColor='neutral-600'
          onClick={onPrev}
          height={54}
        />

        <FullButton label='다음' labelTypo='h4' onClick={onNext} height={54} />
      </div>
    </div>
  );
};
