interface TimeListProps {
  values: number[];
  onSelect: (value: number) => void;
}

export const TimeList = ({values, onSelect}: TimeListProps) => {
  return (
    <ul className='scrollbar-hide mt-2 flex max-h-40 flex-col gap-2.5 overflow-y-auto lg:gap-3'>
      {values.map((value) => (
        <li
          key={value}
          onClick={() => onSelect(value)}
          className='text-body-m cursor-pointer text-center font-normal lg:px-3 lg:py-1'>
          {String(value).padStart(2, '0')}
        </li>
      ))}
    </ul>
  );
};
