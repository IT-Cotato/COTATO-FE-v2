import HeroMainBanner from '@/components/banner/HeroMainBanner';
import {FaqSideBar} from '@/app/(with-footer)/faq/_components/FaqSideBar';
import {FaqAccordionList} from '@/app/(with-footer)/faq/_components/FaqAccordionList';
import {FaqContact} from '@/app/(with-footer)/faq/_components/FaqContact';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

export default function FaqPage() {
  return (
    <section className='flex min-h-screen min-w-360 flex-col items-center bg-white'>
      <HeroMainBanner
        subheading='COTATO와 함께할 여정이 궁금하신가요?'
        heading='자주 묻는 질문에서 답을 찾아 보세요.'
        paddingVertical={76}
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
