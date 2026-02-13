interface TimeListProps {
  values: number[];
  onSelect: (value: number) => void;
}

export const TimeList = ({values, onSelect}: TimeListProps) => {
  return (
    <ul className='scrollbar-hide mt-2 flex max-h-40 flex-col gap-3 overflow-y-auto'>
      {values.map((value) => (
        <li
          key={value}
          onClick={() => onSelect(value)}
          className='text-body-m cursor-pointer px-3 py-1 text-center font-normal'>
          {String(value).padStart(2, '0')}
        </li>
      ))}
    </ul>
  );
};
