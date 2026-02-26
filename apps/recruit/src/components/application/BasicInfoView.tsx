import {FullButton} from '@repo/ui/components/buttons/FullButton';
import {FormRadio} from '@/components/form/FormRadio';
import {BASIC_INFO_LABELS} from '@/constants/admin/admin-applications';
import {FormInput} from '@repo/ui/components/form/FormInput';
import {ApplicationBasicInfoType} from '@/schemas/common/application-schema';

interface BasicInfoViewProps {
  onNext: () => void;
  basicInfo: ApplicationBasicInfoType;
}

export const BasicInfoView = ({onNext, basicInfo}: BasicInfoViewProps) => {
  return (
    <div className='flex flex-col gap-4 sm:gap-6'>
      <FormInput
        label={BASIC_INFO_LABELS.name}
        readOnly
        value={basicInfo.name}
      />

      <div className='flex flex-col gap-4 sm:flex-row sm:gap-10'>
        <div className='flex-1'>
          <FormInput
            label={BASIC_INFO_LABELS.gender}
            readOnly
            value={getGenderLabel(basicInfo.gender)}
          />
        </div>
        <div className='flex-1'>
          <FormInput
            label={BASIC_INFO_LABELS.birthDate}
            readOnly
            value={basicInfo.birthDate}
          />
        </div>
      </div>

      <FormInput
        label={BASIC_INFO_LABELS.phoneNumber}
        readOnly
        value={basicInfo.phoneNumber}
      />

      <div className='flex flex-col gap-4 sm:flex-row sm:gap-11.75'>
        <div className='flex-1'>
          <FormInput
            label={BASIC_INFO_LABELS.school}
            readOnly
            value={basicInfo.school}
          />
        </div>

        <div className='flex flex-row items-end gap-6 sm:gap-11.75'>
          <FormRadio
            readOnly
            label={BASIC_INFO_LABELS.enrollmentStatus}
            checked={basicInfo.isEnrolled}
          />
          <FormRadio
            readOnly
            label={BASIC_INFO_LABELS.otherStatus}
            checked={!basicInfo.isEnrolled}
          />
        </div>
      </div>

      <FormInput
        label={BASIC_INFO_LABELS.major}
        readOnly
        value={basicInfo.major}
      />

      <div className='flex flex-col gap-4 sm:flex-row sm:gap-17.5'>
        <div className='flex-1'>
          <FormInput
            label={BASIC_INFO_LABELS.completedSemesters}
            readOnly
            value={basicInfo.completedSemesters}
          />
        </div>
        <div className='flex-1'>
          <FormInput
            label={BASIC_INFO_LABELS.isPrevActivity}
            readOnly
            value={basicInfo.isPrevActivity ? 'O' : 'X'}
          />
        </div>
      </div>

      <div className='mt-4'>
        <FullButton
          label='다음'
          onClick={onNext}
          height={54}
          className='text-body-s sm:text-h4'
        />
      </div>
    </div>
  );
};

const genderLabelMap: Record<string, string> = {
  MALE: '남',
  FEMALE: '여',
  male: '남',
  female: '여',
};

const getGenderLabel = (gender: string) => {
  return genderLabelMap[gender] ?? genderLabelMap[gender.toLowerCase()] ?? '';
};
