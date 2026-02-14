import {useEffect, useState} from 'react';
import {Checkbox} from '@repo/ui/components/checkbox/CheckBox';

interface CheckboxFilterProps<T extends string> {
  options: T[];
  selected: T[];
  getLabel?: (option: T) => string;
  onChange: (next: T[]) => void;
  onClose: () => void;
}

export const CheckboxFilter = <T extends string>({
  options,
  selected,
  getLabel,
  onChange,
  onClose,
}: CheckboxFilterProps<T>) => {
  const [draftSelected, setDraftSelected] = useState<T[]>(selected);

  useEffect(() => {
    setDraftSelected(selected);
  }, [selected]);

  const handleClick = (value: T) => {
    setDraftSelected((prev) => {
      if (prev.length === 0) {
        return options.filter((v) => v !== value);
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
    <div
      className='text-body-m flex flex-col gap-0.75 rounded-sm bg-neutral-700 p-1.25 text-neutral-300'
      role='group'
      aria-label='필터'>
      {options.map((option) => {
        const isAllSelected = draftSelected.length === 0;
        const isChecked = isAllSelected || draftSelected.includes(option);

        return (
          <label
            key={option}
            className='flex w-full cursor-pointer items-center justify-between rounded-sm border-b border-b-neutral-600 px-2 py-1.5'>
            <span>{getLabel ? getLabel(option) : option}</span>
            <Checkbox
              checked={isChecked}
              onChange={() => handleClick(option)}
            />
          </label>
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
