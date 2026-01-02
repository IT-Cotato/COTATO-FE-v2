'use client';

import {useRecruitmentStore} from '@/store/useRecruitmentStore';
import {RecruitmentActive} from '@/app/(home)/_components/RecruitmentActive';
import {RecruitmentInactive} from '@/app/(home)/_components/RecruitmentInactive';

export default function HomePage() {
  // 스토어에서 실시간 모집 상태를 가져옵니다.
  const isRecruiting = useRecruitmentStore((state) => state.isRecruiting);

  return (
    <main>
      {isRecruiting ? <RecruitmentActive /> : <RecruitmentInactive />}
    </main>
  );
}
