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
    <div className='flex items-center gap-6.25'>
      {Array.from({length: totalSteps}, (_, index) => {
        const step = index + 1;
        const isCurrent = step === currentStep;

        return (
          <div key={step} className='flex items-center gap-6.25'>
            <LogoIcon
              className={`h-10 w-10 ${
                isCurrent ? 'text-hover' : 'text-neutral-300'
              }`}
            />

            {index < totalSteps - 1 && (
              <div className='h-0 w-50 border-t-2 border-dotted border-[#E0E0E0]' />
            )}
          </div>
        );
      })}
    </div>
  );
};
