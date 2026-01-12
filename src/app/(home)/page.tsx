import HomeClient from '@/app/(home)/_components/HomeClient';
import {Suspense} from 'react';

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomeClient />
    </Suspense>
  );
}
