interface TimeButtonProps {
  value: number;
}

export const TimeButton = ({value}: TimeButtonProps) => {
  return (
    <div className='bg-primary text-body-m flex h-6 w-29 items-center justify-center rounded-sm px-3 py-1 text-center font-normal text-white lg:w-14.25'>
      {value}
    </div>
  );
};
