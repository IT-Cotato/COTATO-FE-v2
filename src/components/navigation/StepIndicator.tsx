import SmallLogoOrange from '@/assets/small-logo/small-logo-orange.svg';
import SmallLogoGray from '@/assets/small-logo/small-logo-gray.svg';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

export const StepIndicator = ({
  currentStep,
  totalSteps = 3,
}: StepIndicatorProps) => {
  return (
    <div className='flex items-center gap-[25px]'>
      {Array.from({length: totalSteps}, (_, index) => {
        const step = index + 1;
        const Icon = step === currentStep ? SmallLogoOrange : SmallLogoGray;

        return (
          <div key={index} className='flex items-center gap-[25px]'>
            <Icon key={index} className='h-[71px] w-[69px]' />
            {index < totalSteps - 1 && (
              <div className='h-0 w-80 border-t-2 border-dotted border-[#E0E0E0]' />
            )}
          </div>
        );
      })}
    </div>
  );
};
