export const formFieldStyles = {
  wrapper: 'flex w-full flex-col gap-2.5',
  label: 'text-body-l-b lg:text-h5 text-neutral-800 whitespace-pre-line',
  required: 'text-alert ml-1',
  field:
    'placeholder-h5 lg:placeholder-body-l rounded-[10px] border-[1px] border-neutral-200 px-4 py-2.75 placeholder:text-neutral-400 focus:outline-none bg-white',
  fieldFocus: 'focus:ring-2 focus:ring-primary',
  errorFocus: 'focus:ring-0 focus:outline-none',
  error: '!border-alert',
  errorMessage: 'text-h5 lg:text-body-l text-alert',
  errorContainer: 'min-h-[24px]',
  readOnlyForm: 'text-h5 text-neutral-600 cursor-default lg:font-bold',
  readOnlyTextarea: 'text-h5 lg:text-body-l font-normal text-neutral-600',
};
