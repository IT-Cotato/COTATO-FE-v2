import type {Metadata} from 'next';
import {ProjectContainer} from '../project/_components/ProjectContainer';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

export const metadata: Metadata = {
  title: 'COTATO | STUDY',
  description: '함께 배우고 성장하는 COTATO의 스터디를 만나 보세요.',
};
/** 스터디만 조회하며 프로젝트 화면의 필터·카드·페이지네이션을 재사용한다. */
export default function StudyPage() {
  return (
    <SuspenseWrapper>
      <div className='w-full max-w-xl lg:max-w-275 lg:min-w-5xl'>
        <ProjectContainer kind='study' />
      </div>
    </SuspenseWrapper>
  );
}
