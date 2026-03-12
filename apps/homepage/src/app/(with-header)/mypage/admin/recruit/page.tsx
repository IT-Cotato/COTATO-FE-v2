import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';
import {RecruitLinkCard} from './_components/RecruitLinkCard';

export default function AdminRecruitPage() {
  return (
    <section className='flex flex-col px-6 pt-10 md:p-12.5'>
      <div className='flex flex-col gap-6.75 md:min-w-275'>
        <h1 className='text-h2 sr-only md:not-sr-only md:block'>
          리크루트 세팅
        </h1>
        <SuspenseWrapper>
          <RecruitLinkCard />
        </SuspenseWrapper>
      </div>
    </section>
  );
}
