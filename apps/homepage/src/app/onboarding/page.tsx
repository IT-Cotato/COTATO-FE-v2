import {OnboardingContainer} from '@/app/onboarding/_containers/OnboardingContainer';
import OnboardingBackground from '@/assets/onboarding/onboarding-background.svg';
import {CotatoLogo} from '@repo/ui/components/logo/CotatoLogo';
export default function OnboardingPage() {
  return (
    <section className='relative h-screen w-full overflow-hidden bg-black'>
      <OnboardingBackground className='absolute inset-0 h-full w-full object-cover' />

      <div className='absolute inset-0 flex h-0 w-0 items-center overflow-hidden opacity-0 lg:h-full lg:w-full lg:opacity-100'>
        <div className='flex h-full w-1/2 items-center justify-center'>
          <CotatoLogo />
        </div>
      </div>

      <div className='relative z-10 flex h-full w-full items-center px-6 py-10 md:px-30'>
        <div className='mx-auto lg:mr-0 lg:ml-auto'>
          <OnboardingContainer />
        </div>
      </div>
    </section>
  );
}
