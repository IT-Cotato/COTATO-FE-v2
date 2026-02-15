interface TimeButtonProps {
  value: number;
}

export const TimeButton = ({value}: TimeButtonProps) => {
  return (
    <div className='bg-primary text-body-m h-6 w-14.25 rounded-sm px-3 py-1 text-center font-normal text-white'>
      {value}
    </div>
  );
};
