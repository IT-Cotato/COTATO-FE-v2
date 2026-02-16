import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';
import {RecruitLinkCard} from './_components/RecruitLinkCard';

export default function AdminRecruitPage() {
  return (
    <section className='flex flex-col p-12.5'>
      <div className='flex min-w-275 flex-col gap-6.75'>
        <h1 className='text-h4'>리크루트 세팅</h1>
        <SuspenseWrapper>
          <RecruitLinkCard />
        </SuspenseWrapper>
      </div>
    </section>
  );
}
