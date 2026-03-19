import {MyPageApplicationDetailContainer} from '@/app/(with-footer)/my-page/detail/_containers/MyPageApplicationDetailContainer';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

export default function MyPageApplicationDetailPage() {
  return (
    <section className='flex w-full flex-col bg-white px-6'>
      <SuspenseWrapper>
        <MyPageApplicationDetailContainer />
      </SuspenseWrapper>
    </section>
  );
}
