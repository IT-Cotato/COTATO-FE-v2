interface TimeButtonProps {
  value: number;
}

export const TimeButton = ({value}: TimeButtonProps) => {
  return (
    <div className='h-6 w-14.25 rounded-sm bg-primary px-3 py-1 text-center text-body-s font-normal text-white'>
      {value}
    </div>
  );
};
