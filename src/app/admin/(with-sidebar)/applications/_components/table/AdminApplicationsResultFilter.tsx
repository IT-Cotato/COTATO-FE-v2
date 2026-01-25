import {RESULT_OPTIONS} from '@/constants/admin/admin-applications';
import {ApplicationResultType} from '@/schemas/admin/admin-application-type';
import {useEffect, useState} from 'react';
import {Checkbox} from '@/components/checkbox/CheckBox';

interface AdminApplicationsResultFilterProps {
  selected: ApplicationResultType[];
  onChange: (next: ApplicationResultType[]) => void;
  onClose: () => void;
}

export const AdminApplicationsResultFilter = ({
  selected,

  onChange,
  onClose,
}: AdminApplicationsResultFilterProps) => {
  const [draftSelected, setDraftSelected] =
    useState<ApplicationResultType[]>(selected);

  useEffect(() => {
    setDraftSelected(selected);
  }, [selected]);

  const handleClick = (value: ApplicationResultType) => {
    setDraftSelected((prev) => {
      if (prev.length === 0) {
        return RESULT_OPTIONS.filter((v) => v !== value);
      }
      return prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value];
    });
  };

  const handleConfirm = () => {
    onChange(draftSelected);
    onClose();
  };

  const handleCancel = () => {
    setDraftSelected(selected);
    onClose();
  };

  return (
    <div className='flex flex-col gap-0.75 rounded-sm bg-neutral-700 p-1.25 text-body-s text-neutral-300'>
      {RESULT_OPTIONS.map((option) => {
        const isAllSelected = draftSelected.length === 0;
        const isChecked = isAllSelected || draftSelected.includes(option);

        return (
          <div
            key={option}
            className='flex w-full items-center justify-between rounded-sm border-b border-b-neutral-600 px-2 py-1.5'>
            <span
              className='cursor-pointer'
              onClick={() => handleClick(option)}>
              {option}
            </span>

            <Checkbox
              checked={isChecked}
              onChange={() => handleClick(option)}
            />
          </div>
        );
      })}

      <div className='mt-1 flex flex-row justify-end gap-2 px-1.75 pb-1'>
        <button type='button' onClick={handleCancel}>
          취소
        </button>
        <button type='button' onClick={handleConfirm} className='text-white'>
          확인
        </button>
      </div>
    </div>
  );
};
