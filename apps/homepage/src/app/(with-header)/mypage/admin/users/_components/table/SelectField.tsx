import {Dropdown} from '@/components/dropdown/Dropdown';
import {fieldClass} from './TextField';

const dropdownTriggerClass =
  'justify-between rounded-[10px] bg-neutral-50 px-4 py-2.5 text-body-l text-neutral-600';

export const SelectField = ({
  label,
  displayValue,
  options,
  onSelect,
  readonly,
}: {
  label: string;
  displayValue: string;
  options: string[];
  onSelect: (val: string) => void;
  readonly: boolean;
}) => (
  <div className='flex flex-col gap-2.5'>
    <label className='text-h5 text-neutral-600'>{label}</label>
    {readonly ? (
      <input readOnly value={displayValue} className={fieldClass} />
    ) : (
      <Dropdown<string>
        value={displayValue}
        options={options}
        onSelect={onSelect}
        className='w-full'
        triggerClassName={dropdownTriggerClass}
      />
    )}
  </div>
);
