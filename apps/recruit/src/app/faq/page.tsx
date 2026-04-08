import {FaqSideBar} from '@/app/faq/_components/FaqSideBar';
import {FaqAccordionList} from '@/app/faq/_components/FaqAccordionList';
import {FaqContact} from '@/app/faq/_components/FaqContact';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';
import Image from 'next/image';
import HeroBanner from '@/assets/backgrounds/banners/hero-main.webp';
import HeroMainBanner from '@repo/ui/components/banner/HeroMainBanner';

export default function FaqPage() {
  return (
    <section className='flex min-h-screen w-full flex-col items-center bg-white'>
      <HeroMainBanner
        heading='Cotato와 함께할 여정이 궁금하신가요?'
        subheading='자주 묻는 질문에서 답을 찾아보세요.'
        bannerImage={
          <Image
            src={HeroBanner}
            alt='Hero Banner'
            fill
            priority
            className='object-cover object-left lg:object-center'
          />
        }
      />
      <div className='flex w-full flex-1 flex-col gap-7.5 px-6 py-10 lg:flex-row lg:gap-0 lg:px-0 lg:py-0'>
        <SuspenseWrapper>
          <FaqSideBar />
          <div className='flex flex-1 flex-col gap-19 lg:px-11.25 lg:pt-11.5 lg:pb-13.5'>
            <FaqAccordionList />
            <FaqContact />
          </div>
        </SuspenseWrapper>
      </div>
    </section>
  );
}
