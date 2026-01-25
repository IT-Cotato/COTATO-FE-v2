'use client';

import {RecruitmentInfoEditRow} from '@/app/admin/(with-sidebar)/application-edit/_components/recruitment/RecruitmentInfoEditRow';
import {RecruitmentInfoViewRow} from '@/app/admin/(with-sidebar)/application-edit/_components/recruitment/RecruitmentInfoViewRow';
import {scheduleSections} from '@/constants/admin/admin-application-questions';
import {RecruitmentInformation} from '@/schemas/admin/admin-recruitment-information.schema';

import {formatRecruitmentDate} from '@/utils/formatDate';
import {clsx} from 'clsx';

interface AdminRecruitmentInformationProps {
  variant?: 'bordered' | 'plain';
  data: RecruitmentInformation;
  isEditing: boolean;
  onChange: (next: RecruitmentInformation) => void;
}

export const AdminRecruitmentInformation = ({
  variant = 'bordered',
  data,
  isEditing,
  onChange,
}: AdminRecruitmentInformationProps) => {
  return (
    <div
      className={clsx(
        'flex flex-col gap-5 rounded-[10px]',
        variant === 'bordered' && 'border border-neutral-300 px-6.25 py-7.5'
      )}>
      {scheduleSections.map((section) =>
        isEditing ? (
          <RecruitmentInfoEditRow
            key={section.label}
            label={section.label}
            type={section.type}
            start={data[section.start]}
            end={section.type === 'range' ? data[section.end!] : undefined}
            onChange={({start, end}) => {
              onChange({
                ...data,
                [section.start]: start,
                ...(section.type === 'range' && {
                  [section.end!]: end,
                }),
              });
            }}
          />
        ) : (
          <RecruitmentInfoViewRow
            key={section.label}
            label={section.label}
            value={
              section.type === 'range'
                ? `${formatRecruitmentDate(
                    data[section.start]
                  )} ~ ${formatRecruitmentDate(data[section.end!])}`
                : formatRecruitmentDate(data[section.start])
            }
          />
        )
      )}
    </div>
  );
};
