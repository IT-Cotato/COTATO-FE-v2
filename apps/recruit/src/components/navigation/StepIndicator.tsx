import LogoIcon from '@/assets/small-logo/small-logo.svg';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

export const StepIndicator = ({
  currentStep,
  totalSteps = 3,
}: StepIndicatorProps) => {
  return (
    <div className='flex w-full items-center justify-between gap-6.25 lg:px-50'>
      {Array.from({length: totalSteps}, (_, index) => {
        const step = index + 1;
        const isCurrent = step === currentStep;

        return (
          <div key={step} className='flex flex-1 items-center last:flex-none'>
            <LogoIcon
              className={`h-3.5 w-3.5 shrink-0 lg:h-10 lg:w-10 ${
                isCurrent ? 'text-hover' : 'text-neutral-300'
              }`}
            />

            {index < totalSteps - 1 && (
              <div className='mx-2 h-0 flex-1 border-t-2 border-dotted border-[#E0E0E0] lg:mx-4' />
            )}
          </div>
        );
      })}
    </div>
  );
};
