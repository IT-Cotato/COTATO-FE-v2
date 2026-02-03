import {HomeClient} from '@/app/(home)/_components/HomeClient';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

export default function HomePage() {
  return (
    <SuspenseWrapper>
      <HomeClient />
    </SuspenseWrapper>
  );
}
