export const ToggleSwitch = () => {
  return (
    <label className='relative inline-flex cursor-pointer items-center'>
      <input type='checkbox' className='peer sr-only' />
      <div className='peer peer-checked:bg-primary h-7 w-13 rounded-full bg-neutral-300 after:absolute after:top-[3px] after:left-[4px] after:h-5.5 after:w-5.5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full' />
    </label>
  );
};
