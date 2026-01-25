import {FullButton} from '@/components/button/FullButton';
import {FormFile} from '@/components/form/FormFile';
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
  return (
    <div className='flex flex-col gap-10'>
      {questionsWithAnswers.map((data) => (
        <FormTextarea
          key={data.sequence}
          label={`${data.sequence}. ${data.questionContent}`}
          readOnly
          value={data.content ?? ''}
          maxLength={500}
          currentLength={data.byteSize}
        />
      ))}

      <div className='flex flex-col gap-5'>
        {pdfFileUrl && (
          <div className='flex flex-col gap-5'>
            <label className='text-h5 text-neutral-800'>포트폴리오</label>
            <FormLink readOnly value={pdfFileUrl} />
          </div>
        )}

        {/* <FormFile readOnly value={data.files?.map((f) => f.name)} /> */}
      </div>

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
