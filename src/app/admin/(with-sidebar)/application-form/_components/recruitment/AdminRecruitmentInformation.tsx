'use client';

import {RecruitmentInfoEditRow} from '@/app/admin/(with-sidebar)/application-form/_components/recruitment/RecruitmentInfoEditRow';
import {RecruitmentInfoViewRow} from '@/app/admin/(with-sidebar)/application-form/_components/recruitment/RecruitmentInfoViewRow';
import {scheduleSections} from '@/constants/admin/admin-application-form';
import {mockRecruitmentInfo} from '@/mocks/mock-application-form';
import {useAdminApplicationFormStore} from '@/stores/useAdminApplicationFormStore';

type RecruitmentValue = {
  start?: string;
  end?: string;
};

export const AdminRecruitmentInformation = () => {
  const isEditing = useAdminApplicationFormStore(
    (s) => s.isEditingRecruitmentInfo
  );

  const {
    recruitmentPeriod,
    documentResultDate,
    interviewPeriod,
    finalResultDate,
    orientationDate,
  } = mockRecruitmentInfo[0];

  const values: Record<
    (typeof scheduleSections)[number]['key'],
    RecruitmentValue
  > = {
    recruitmentPeriod,
    documentResultDate,
    interviewPeriod,
    finalResultDate,
    orientationDate,
  };

  return (
    <div className='flex flex-col gap-3 rounded-[10px] border border-neutral-300 px-4 py-5.25'>
      {scheduleSections.map(({key, label, type}) =>
        isEditing ? (
          <RecruitmentInfoEditRow
            key={key}
            label={label}
            type={type}
            value={values[key]}
            onChange={(nextValue) => {
              // TODO: draft 업데이트
              console.log('', nextValue);
            }}
          />
        ) : (
          <RecruitmentInfoViewRow
            key={key}
            label={label}
            value={
              type === 'range'
                ? `${values[key].start ?? ''} ~ ${values[key].end ?? ''}`
                : (values[key].start ?? '')
            }
          />
        )
      )}
    </div>
  );
};
