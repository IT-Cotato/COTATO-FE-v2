import {OnboardingContainer} from '@/app/onboarding/_containers/OnboardingContainer';
import OnboardingBackground from '@/assets/onboarding/onboarding-background.svg';
import {CotatoLogo} from '@/components/logo/CotatoLogo';

export default function OnboardingPage() {
  return (
    <section className='relative h-screen w-full overflow-hidden bg-black'>
      <OnboardingBackground className='absolute inset-0 h-full w-full object-cover' />

      <div className='relative flex h-full w-full items-start px-30 py-10'>
        <div className='absolute top-2/5 left-1/4 -translate-x-1/2'>
          <CotatoLogo />
        </div>
        <div className='ml-auto'>
          <OnboardingContainer />
        </div>
      </div>
    </section>
  );
}
