import {FullButton} from '@/components/button/FullButton';
import {FormLink} from '@/components/form/FormLink';
import {FormTextarea} from '@/components/form/FormTextarea';
import {PartQuestionWithAnswerType} from '@/schemas/admin/admin-application.schema';

interface PartQuestionViewProps {
  onNext: () => void;
  onPrev: () => void;
  questionsWithAnswers: PartQuestionWithAnswerType[];
  pdfFileUrl: string | null;
}

export const PartQuestionView = ({
  onNext,
  onPrev,
  questionsWithAnswers,
  pdfFileUrl,
}: PartQuestionViewProps) => {
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
                  value={pdfFileUrl}
                />
              ) : (
                <p className='flex justify-center text-h5 text-neutral-400'>
                  첨부된 포트폴리오가 없습니다.
                </p>
              )
            ) : (
              <FormTextarea
                label={`${data.sequence}. ${data.questionContent}`}
                readOnly
                value={data.content ?? ''}
                maxLength={500}
                currentLength={data.byteSize}
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
