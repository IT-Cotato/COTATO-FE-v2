import {ActionContainer} from '@/app/(with-footer)/recruit/_containers/ActionContainer';
import {ContentContainer} from '@/app/(with-footer)/recruit/_containers/ContentContainer';

export default function RecruitmentNoticePage() {
  return (
    <section className='flex w-full min-w-min flex-col items-center bg-white'>
      <ActionContainer />
      <ContentContainer />
    </section>
  );
}
