interface TimeListProps {
  values: string[];
  onSelect: (value: string) => void;
}

export const TimeList = ({values, onSelect}: TimeListProps) => {
  return (
    <ul className='scrollbar-hide mt-2 flex max-h-40 flex-col gap-3 overflow-y-auto'>
      {values.map((value) => (
        <li
          key={value}
          onClick={() => onSelect(value)}
          className='cursor-pointer px-3 py-1 text-center text-body-s font-normal'>
          {value}
        </li>
      ))}
    </ul>
  );
};
