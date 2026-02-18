import {useEffect} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {BasicInfoResponse} from '@/schemas/apply/apply-schema';

interface UseApplyURLSyncProps {
  step: number;
  basicInfo?: BasicInfoResponse;
}

export const useApplyURLSync = ({step, basicInfo}: UseApplyURLSyncProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlPart = searchParams.get('part');
    const savedPart = basicInfo?.applicationPartType;

    // step 1: part 파라미터가 있으면 제거
    if (step === 1 && urlPart) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('part');
      router.replace(`/apply?${newParams.toString()}`);
    } else if (
      (step === 2 || step === 3) &&
      savedPart &&
      urlPart !== savedPart
    ) {
      // step 2, 3: 서버 저장 파트와 URL이 다르면 동기화
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('part', savedPart);
      router.replace(`/apply?${newParams.toString()}`);
    }
  }, [step, searchParams, basicInfo?.applicationPartType, router]);
};
