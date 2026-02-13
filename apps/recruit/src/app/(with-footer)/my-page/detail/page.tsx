import {MyPageApplicationDetailContainer} from '@/app/(with-footer)/my-page/detail/_containers/MyPageApplicationDetailContainer';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

export default function MyPageApplicationDetailPage() {
  return (
    <section className='bg-white'>
      <SuspenseWrapper>
        <MyPageApplicationDetailContainer />
      </SuspenseWrapper>
    </section>
  );
}
