import {FullButton} from '@/components/button/FullButton';
import {FormFile} from '@/components/form/FormFile';
import {FormLink} from '@/components/form/FormLink';
import {FormTextarea} from '@/components/form/FormTextarea';
import {PART_TABS} from '@/constants/admin/admin-application-questions';
import {PartType} from '@/schemas/admin/admin-application-questions.schema';
import {PartQuestionWithAnswerType} from '@/schemas/admin/admin-application.schema';

interface PartQuestionViewProps {
  onNext: () => void;
  onPrev: () => void;
  selectedPart: PartType;
  questionsWithAnswers: PartQuestionWithAnswerType[];
  pdfFileUrl: string | null;
}

export const PartQuestionView = ({
  onNext,
  onPrev,
  selectedPart,
  questionsWithAnswers,
  pdfFileUrl,
}: PartQuestionViewProps) => {
  return (
    <div className='flex flex-col gap-10'>
      <label className='text-h3 text-neutral-600'>
        {PART_TABS.find((tab) => tab.value === selectedPart)?.label ?? '-'}{' '}
        파트에 관한 질문입니다.
      </label>

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
            <label className='text-h5 text-neutral-600'>포트폴리오</label>
            <FormLink readOnly value={pdfFileUrl} />
          </div>
        )}

        {/* <FormFile readOnly value={data.files?.map((f) => f.name)} /> */}
      </div>

      <div className='flex flex-row gap-6.5'>
        <FullButton
          label='이전'
          labelTypo='h4'
          backgroundColor='neutral-300'
          onClick={onPrev}
        />

        <FullButton label='다음' labelTypo='h4' onClick={onNext} />
      </div>
    </div>
  );
};
