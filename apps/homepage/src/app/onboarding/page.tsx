import {OnboardingContainer} from '@/app/onboarding/_containers/OnboardingContainer';
import OnboardingBackground from '@/assets/onboarding/onboarding-background.svg';
import {CotatoLogo} from '@repo/ui/components/logo/CotatoLogo';
import clsx from 'clsx';

export default function OnboardingPage() {
  return (
    <section className='relative h-screen w-full overflow-hidden bg-black'>
      <OnboardingBackground
        className={clsx(
          'absolute inset-0 object-cover transition-all duration-500',

          '-left-[50%] h-[200%] w-[200%] object-top-left',

          'xl:left-0 xl:h-full xl:w-full xl:object-center'
        )}
      />

      <div className='absolute inset-0 flex h-0 w-0 items-center overflow-hidden opacity-0 xl:h-full xl:w-full xl:opacity-100'>
        <div className='flex h-full w-1/2 items-center justify-center'>
          <CotatoLogo />
        </div>
      </div>

      <div className='relative z-10 flex h-full w-full items-center px-6 py-10 xl:px-30'>
        <div className='mx-auto xl:mr-0 xl:ml-auto'>
          <OnboardingContainer />
        </div>
      </div>
    </section>
  );
}
