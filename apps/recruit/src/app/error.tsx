'use client';

import {Button} from '@repo/ui/components/buttons/Button';
import * as Sentry from '@sentry/nextjs';
import {useEffect} from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & {digest?: string};
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className='flex h-screen flex-col items-center justify-center gap-4'>
      <p>알 수 없는 오류가 발생했습니다.</p>
      <Button label='다시 시도' onClick={() => reset()} />
    </div>
  );
}
