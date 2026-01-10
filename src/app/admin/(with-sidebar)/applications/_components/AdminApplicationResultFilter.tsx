import {RESULT_OPTIONS} from '@/constants/admin/admin-applications';
import {ApplicationResultType} from '@/schemas/admin/admin-application-type';
import CheckIcon from '@/assets/icons/check.svg';
import clsx from 'clsx';
import {RefObject, useEffect, useState} from 'react';
import {useClickOutside} from '@/hooks/useClickOutside';

interface AdminApplicationResultFilterProps {
  selected: ApplicationResultType[];
  filterAreaRef: RefObject<HTMLElement | null>;
  onChange: (next: ApplicationResultType[]) => void;
  onClose: () => void;
}

export const AdminApplicationResultFilter = ({
  selected,
  filterAreaRef,
  onChange,
  onClose,
}: AdminApplicationResultFilterProps) => {
  const [draftSelected, setDraftSelected] =
    useState<ApplicationResultType[]>(selected);

  useClickOutside(filterAreaRef, onClose);

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
          <button
            key={option}
            type='button'
            onClick={() => handleClick(option)}
            className='flex w-full items-center justify-between rounded-sm border-b border-b-neutral-600 px-2 py-1.5'>
            <span>{option}</span>

            <div
              className={clsx(
                'flex h-4 w-4 items-center justify-center',
                isChecked ? 'bg-primary' : 'bg-neutral-600'
              )}>
              <CheckIcon />
            </div>
          </button>
        );
      })}

      <div className='mt-1 flex flex-row justify-end gap-2 px-1.75 pb-1'>
        <button onClick={handleCancel}>취소</button>
        <button onClick={handleConfirm} className='text-white'>
          확인
        </button>
      </div>
    </div>
  );
};
