import {FaqSideBar} from '@/app/(with-footer)/faq/_components/FaqSideBar';
import {FaqAccordionList} from '@/app/(with-footer)/faq/_components/FaqAccordionList';
import {FaqContact} from '@/app/(with-footer)/faq/_components/FaqContact';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';
import Image from 'next/image';
import HeroBanner from '@/assets/backgrounds/banners/hero-main.webp';
import HeroMainBanner from '@repo/ui/components/banner/HeroMainBanner';

export default function FaqPage() {
  return (
    <section className='flex min-h-screen min-w-360 flex-col items-center bg-white'>
      <HeroMainBanner
        heading='Cotato와 함께할 여정이 궁금하신가요?'
        subheading='자주 묻는 질문에서 답을 찾아보세요.'
        bannerImage={
          <Image
            src={HeroBanner}
            alt='Hero Banner'
            fill
            priority
            className='object-cover object-center'
          />
        }
      />
      <div className='flex w-full flex-1'>
        <SuspenseWrapper>
          <FaqSideBar />
          <div className='flex flex-1 flex-col gap-19 px-11.25 pt-11.5 pb-13.5'>
            <FaqAccordionList />
            <FaqContact />
          </div>
        </SuspenseWrapper>
      </div>
    </section>
  );
}
