import {FullButton} from '@repo/ui/components/buttons/FullButton';
import {FormRadio} from '@/components/form/FormRadio';
import {BASIC_INFO_LABELS} from '@/constants/admin/admin-applications';
import {AdminApplicationBasicInfoType} from '@/schemas/admin/admin-application.schema';
import {FormInput} from '@repo/ui/components/form/FormInput';

interface BasicInfoViewProps {
  onNext: () => void;
  basicInfo: AdminApplicationBasicInfoType;
}

export const BasicInfoView = ({onNext, basicInfo}: BasicInfoViewProps) => {
  return (
    <div className='flex flex-col gap-4'>
      <FormInput
        label={BASIC_INFO_LABELS.name}
        readOnly
        value={basicInfo.name}
      />

      <div className='flex flex-row gap-10'>
        <FormInput
          label={BASIC_INFO_LABELS.gender}
          readOnly
          value={getGenderLabel(basicInfo.gender)}
        />
        <FormInput
          label={BASIC_INFO_LABELS.birthDate}
          readOnly
          value={basicInfo.birthDate}
        />
      </div>

      <FormInput
        label={BASIC_INFO_LABELS.phoneNumber}
        readOnly
        value={basicInfo.phoneNumber}
      />

      <div className='flex w-241 flex-row gap-11.75'>
        <FormInput
          label={BASIC_INFO_LABELS.school}
          readOnly
          value={basicInfo.school}
        />
        <div className='flex flex-row items-end gap-11.75'>
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
      <div className='flex flex-row gap-17.5'>
        <FormInput
          label={BASIC_INFO_LABELS.completedSemesters}
          readOnly
          value={basicInfo.completedSemesters}
        />

        <FormInput
          label={BASIC_INFO_LABELS.isPrevActivity}
          readOnly
          value={basicInfo.isPrevActivity ? 'O' : 'X'}
        />
      </div>

      <FullButton label='다음' labelTypo='h4' onClick={onNext} height={54} />
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
