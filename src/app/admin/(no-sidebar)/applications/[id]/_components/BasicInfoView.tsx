import {FullButton} from '@/components/button/FullButton';
import {FormInput} from '@/components/form/FormInput';
import {FormRadio} from '@/components/form/FormRadio';
import {BASIC_INFO_LABELS} from '@/constants/admin/admin-applications';

import {BasicInfoType} from '@/schemas/admin/admin-application-type';

interface BasicInfoViewProps {
  onNext: () => void;
  data: BasicInfoType;
}

export const BasicInfoView = ({onNext, data}: BasicInfoViewProps) => {
  return (
    <div className='flex flex-col gap-7.5'>
      <FormInput label={BASIC_INFO_LABELS.name} readOnly value={data.name} />

      <div className='flex flex-row gap-17.5'>
        <FormInput
          label={BASIC_INFO_LABELS.gender}
          readOnly
          value={data.gender}
        />
        <FormInput
          label={BASIC_INFO_LABELS.birthDate}
          readOnly
          value={data.birthDate}
        />
      </div>

      <FormInput
        label={BASIC_INFO_LABELS.phoneNumber}
        readOnly
        value={data.phoneNumber}
      />

      <div className='flex w-241 flex-row gap-11.75'>
        <FormInput
          label={BASIC_INFO_LABELS.school}
          readOnly
          value={data.school}
        />
        <div className='flex flex-row items-end gap-11.75'>
          <FormRadio
            readOnly
            label={BASIC_INFO_LABELS.enrollmentStatus}
            checked={data.enrollmentStatus === '재학'}
          />
          <FormRadio
            readOnly
            label={BASIC_INFO_LABELS.otherStatus}
            checked={data.enrollmentStatus !== '재학'}
          />
        </div>
      </div>

      <FormInput label={BASIC_INFO_LABELS.major} readOnly value={data.major} />
      <div className='flex flex-row gap-17.5'>
        <FormInput
          label={BASIC_INFO_LABELS.completedSemesters}
          readOnly
          value={data.completedSemesters}
        />

        <FormInput
          label={BASIC_INFO_LABELS.isPrevActivity}
          readOnly
          value={data.isPrevActivity}
        />
      </div>

      <FullButton
        label='다음'
        labelTypo='h4'
        onClick={onNext}
        className='mt-10'
      />
    </div>
  );
};
