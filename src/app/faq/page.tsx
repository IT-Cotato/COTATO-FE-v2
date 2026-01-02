import HeroMainBanner from '@/components/banner/HeroMainBanner';
import FaqSideBar from '@/app/faq/_components/FaqSideBar';
import FaqAccordionList from '@/app/faq/_components/FaqAccordionList';
import FaqContact from '@/app/faq/_components/FaqContact';

export default function FaqPage() {
  return (
    <section className='flex min-h-screen w-full flex-col items-center gap-22.25 bg-neutral-100'>
      <HeroMainBanner
        heading='COTATO와 함께할 여정이 궁금하신가요?'
        subheading='자주 묻는 질문에서 답을 찾아 보세요.'
      />
      <div className='flex flex-col items-center gap-9.5'>
        <div className='flex gap-28.25 self-stretch'>
          <FaqSideBar />
          <FaqAccordionList />
        </div>
        <FaqContact />
      </div>
    </section>
  );
}
