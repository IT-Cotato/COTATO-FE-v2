import {FullButton} from '@repo/ui/components/buttons/FullButton';
import {FormTextarea} from '@repo/ui/components/form/FormTextarea';
import {PartQuestionWithAnswerType} from '@/schemas/admin/admin-application.schema';
import {FormLink} from '@repo/ui/components/form/FormLink';
import {FormFile} from '@repo/ui/components/form/FormFile';

interface PartQuestionViewProps {
  onNext: () => void;
  onPrev: () => void;
  questionsWithAnswers: PartQuestionWithAnswerType[];
  pdfFileKey: string | null | undefined;
  pdfFileUrl: string | null | undefined;
}

export const PartQuestionView = ({
  onNext,
  onPrev,
  questionsWithAnswers,
  pdfFileKey,
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
              <div className='flex flex-col gap-5'>
                {/* 1. 링크와 파일이 하나라도 있는 경우 */}
                {pdfFileUrl || pdfFileKey ? (
                  <>
                    {/* 링크 렌더링 */}
                    {pdfFileUrl && (
                      <FormLink
                        label={`${data.sequence}. ${data.questionContent}${pdfFileKey ? ' (링크)' : ''}`}
                        readOnly
                        value={[pdfFileUrl]}
                      />
                    )}
                    {/* 파일 렌더링 */}
                    {pdfFileKey && <FormFile readOnly value={[pdfFileKey]} />}
                  </>
                ) : (
                  /* 2. 둘 다 없는 경우 */
                  <div className='flex flex-col gap-2'>
                    <label className='text-h6 font-bold'>{`${data.sequence}. ${data.questionContent}`}</label>
                    <p className='text-h5 flex justify-center rounded-lg border border-dashed py-4 text-neutral-400'>
                      첨부된 포트폴리오가 없습니다.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* 일반 질문 렌더링 */
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
