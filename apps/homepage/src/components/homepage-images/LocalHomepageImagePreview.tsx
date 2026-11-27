'use client';

import {HomeContentLayout} from '@/app/(with-header)/(with-footer)/(home)/_components/HomeContentLayout';

import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useState, type MouseEvent} from 'react';
import MainLogo from '@/assets/main-logo/main-logo.svg';
import SmallLogo from '@/assets/small-logo/small-logo.svg';
import ChevronDown from '@/assets/chevrons/chevron-down.svg';
import {ROUTES} from '@/constants/routes';
import {SideBarView} from '@/components/sidebar/SideBarView';
import {useHomepageImagePermissionQuery} from '@/hooks/queries/useHomepageImages.query';
import {HomepageImageManager} from './HomepageImageManager';
import {
  HomepageImagePreviewContext,
  LOCAL_IMAGE_ACTORS,
  type HomepageImagePreviewActor,
} from './HomepageImagePreviewContext';
import {HomeMainScheduleContainer} from '@/app/(with-header)/(with-footer)/(home)/_containers/HomeMainScheduleContainer';
import {HomePartSectionContainer} from '@/app/(with-header)/(with-footer)/(home)/_containers/HomePartSectionContainer';

/** 합성 계정만 전달하며 실제 인증 상태를 변경하지 않는 로컬 테스트 진입점이다. */
export const LocalHomepageImagePreview = ({view = false}: {view?: boolean}) => {
  const [actor, setActor] =
    useState<HomepageImagePreviewActor>('current-operation');
  return (
    <HomepageImagePreviewContext.Provider value={actor}>
      <LocalHomepageImageLayout
        actor={actor}
        onActorChange={setActor}
        view={view}
      />
    </HomepageImagePreviewContext.Provider>
  );
};

interface LocalHomepageImageLayoutProps {
  actor: HomepageImagePreviewActor;
  onActorChange: (value: HomepageImagePreviewActor) => void;
  view: boolean;
}

/** 기존 검은 헤더의 로고·여백과 실제 SideBarView를 사용한다. 다른 메뉴의 실제 API는 호출하지 않는다. */
const LocalHomepageImageLayout = ({
  actor,
  onActorChange,
  view,
}: LocalHomepageImageLayoutProps) => {
  const router = useRouter();
  const permission = useHomepageImagePermissionQuery();
  const [notice, setNotice] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const canEdit = permission.data?.canEdit === true;
  const isAdmin = actor !== 'current-member';
  const managerPath = '/local/homepage-images';
  const homePath = '/local/homepage-images/view';
  const navigate = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (
      event.currentTarget.getAttribute('href') === ROUTES.ADMIN_HOMEPAGE_IMAGES
    ) {
      setMobileMenuOpen(false);
      if (view) router.push(managerPath);
      return;
    }
    setNotice('로컬에서는 홈페이지 사진 관리 기능만 확인할 수 있습니다.');
  };
  const sidebar = (
    <SideBarView
      isAdmin={isAdmin}
      canManageHomepageImages={canEdit}
      pathname={ROUTES.ADMIN_HOMEPAGE_IMAGES}
      onLogout={() =>
        setNotice('실제 로그인이 아닌 로컬 테스트 계정을 사용 중입니다.')
      }
      onLinkClick={navigate}
    />
  );

  return (
    <div className='min-h-screen bg-white text-neutral-800'>
      <header
        className={`z-header sticky top-0 flex h-12.5 w-full items-center justify-between bg-black px-6 lg:h-22 lg:pr-26.25 lg:pl-6.25 ${view ? '' : 'lg:min-w-360'}`}>
        <Link href={homePath} aria-label='COTATO 홈으로 이동'>
          <MainLogo className='w-28 lg:w-36.5' />
        </Link>
        <nav
          aria-label='홈페이지 상단 메뉴'
          className='hidden items-center gap-5 lg:flex'>
          {[
            {label: 'ABOUT US', href: ROUTES.ABOUTUS},
            {label: 'PROJECT', href: ROUTES.PROJECT},
            {label: 'STUDY', href: ROUTES.STUDY},
            {label: 'RECRUIT', href: ROUTES.RECRUIT},
          ].map(({label, href}) => (
            <Link
              key={href}
              href={href}
              onClick={navigate}
              className='text-body-l-sb px-4.25 py-6 text-neutral-300 transition-colors hover:text-neutral-50'>
              {label}
            </Link>
          ))}
          <Link
            href={managerPath}
            className='text-body-l-sb flex items-center gap-1.25 text-white'>
            <SmallLogo className='h-4 w-4 text-white' />
            {isAdmin ? '운영진' : '회원'}
          </Link>
        </nav>
        <Link
          href={view ? managerPath : homePath}
          className='text-body-m text-neutral-100 lg:hidden'>
          {view ? '사진 관리' : '홈페이지 미리보기'}
        </Link>
      </header>

      {notice && (
        <div
          role='status'
          className='fixed top-16 right-4 z-[60] flex max-w-[360px] items-center gap-4 rounded-[10px] border border-neutral-100 bg-white px-5 py-4 text-sm shadow-lg lg:top-26'>
          <span>{notice}</span>
          <button
            type='button'
            onClick={() => setNotice('')}
            aria-label='로컬 안내 닫기'
            className='text-xl text-neutral-500'>
            ×
          </button>
        </div>
      )}

      {view ? (
        <main>
          <HomeContentLayout>
            <HomeMainScheduleContainer />
            <HomePartSectionContainer />
          </HomeContentLayout>
        </main>
      ) : (
        <>
          <div className='px-6 pt-10 lg:hidden'>
            <button
              type='button'
              aria-expanded={mobileMenuOpen}
              aria-controls='local-mypage-mobile-menu'
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className='flex w-full items-center justify-between rounded-[10px] border border-neutral-100 p-2.5 text-left'>
              <span className='text-h3'>홈페이지 사진 관리</span>
              <ChevronDown
                className={`h-6 w-6 ${mobileMenuOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {mobileMenuOpen && (
              <div
                id='local-mypage-mobile-menu'
                className='mt-2.5 overflow-hidden rounded-[5px] bg-neutral-50'>
                {sidebar}
              </div>
            )}
          </div>
          <section className='flex min-h-screen w-full min-w-0 flex-col lg:min-w-360 lg:flex-row'>
            <aside className='z-sidebar sticky left-0 hidden bg-neutral-50 lg:block'>
              {sidebar}
            </aside>
            <main className='min-w-0 flex-1'>
              <HomepageImageManager key={actor} />
            </main>
          </section>
        </>
      )}

      <details className='fixed right-4 bottom-4 z-50 max-w-[320px] rounded-[10px] border border-neutral-200 bg-white shadow-md'>
        <summary className='cursor-pointer px-4 py-2.5 text-xs font-semibold text-neutral-500'>
          로컬 미리보기 설정
        </summary>
        <div className='flex flex-col gap-4 border-t border-neutral-100 p-4'>
          <label className='flex flex-col gap-2 text-xs text-neutral-500'>
            테스트 계정
            <select
              aria-label='로컬 테스트 계정'
              value={actor}
              onChange={(event) =>
                onActorChange(event.target.value as HomepageImagePreviewActor)
              }
              className='rounded-[5px] border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-800'>
              {LOCAL_IMAGE_ACTORS.map((value) => (
                <option key={value.value} value={value.value}>
                  {value.label}
                </option>
              ))}
            </select>
          </label>
          <Link
            href={view ? managerPath : homePath}
            className='text-primary text-xs font-semibold'>
            {view ? '사진 관리로 돌아가기' : '홈페이지 미리보기 ↗'}
          </Link>
          <p className='text-xs leading-5 text-neutral-400'>
            합성 계정으로 확인하는 로컬 화면입니다. 사진과 설정은 이 컴퓨터에만
            저장됩니다.
          </p>
        </div>
      </details>
    </div>
  );
};
