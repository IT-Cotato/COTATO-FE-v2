import {FullButton} from '@/components/button/FullButton';
import {FormFile} from '@/components/form/FormFile';
import {FormInput} from '@/components/form/FormInput';
import {FormLink} from '@/components/form/FormLink';
import {FormTextarea} from '@/components/form/FormTextarea';
import {PART_QUESTION_LABELS} from '@/constants/admin/admin-applications';
import {PartQuestionType} from '@/schemas/admin/admin-application-type';

interface PartQuestionViewProps {
  onNext: () => void;
  onPrev: () => void;
  data: PartQuestionType;
}

// TODO: 추후 서버에서 받아온 파트별 질문 데이터로 교체

export const PartQuestionView = ({
  onNext,
  onPrev,
  data,
}: PartQuestionViewProps) => {
  return (
    <div className='flex flex-col gap-10'>
      <FormInput label='파트' readOnly value={data.selectedPart} />
      <label className='text-h3 text-neutral-600'>
        {data.selectedPart} 파트에 관한 질문입니다.
      </label>

      <FormTextarea
        label='1. 코테이토에서 어떤 부분에서 성장하고 싶은지 지원동기를 작성해주세요.'
        readOnly
        value={data.ans_1}
        maxLength={500}
        currentLength={data.ans_1?.length ?? 0}
      />

      <FormTextarea
        label='1. 코테이토에서 어떤 부분에서 성장하고 싶은지 지원동기를 작성해주세요.'
        readOnly
        value={data.ans_2}
        maxLength={500}
        currentLength={data.ans_2?.length ?? 0}
      />

      <FormTextarea
        label='1. 코테이토에서 어떤 부분에서 성장하고 싶은지 지원동기를 작성해주세요.'
        readOnly
        value={data.ans_3}
        maxLength={500}
        currentLength={data.ans_3?.length ?? 0}
      />

      <FormTextarea
        label='1. 코테이토에서 어떤 부분에서 성장하고 싶은지 지원동기를 작성해주세요.'
        readOnly
        value={data.ans_4}
        maxLength={500}
        currentLength={data.ans_4?.length ?? 0}
      />

      <div className='flex flex-col gap-5'>
        <label className='text-h5 text-neutral-600'>
          5. {PART_QUESTION_LABELS.fileAccept}
        </label>
        {data.links?.map((link: string | undefined, idx: number) => (
          <FormLink key={idx} readOnly value={link} />
        ))}

        <FormFile readOnly value={data.files?.map((f) => f.name)} />
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
