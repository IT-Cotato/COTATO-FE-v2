'use client';

import {useSearchParams, useRouter, usePathname} from 'next/navigation';
import {useCallback, useMemo} from 'react';
import {ProjectSection} from './ProjectSection';
import {Dropdown} from '@/components/dropdown/Dropdown';
import {Button} from '@repo/ui/components/buttons/Button';
import {ROUTES} from '@/constants/routes';
import {ACTIVITY_MAP} from '@/constants/project/project-activity';
import {useGenerationQuery} from '@/hooks/queries/useGeneration.query';
import {Spinner} from '@repo/ui/components/spinner/Spinner';
import {useAuthStore} from '@/store/useAuthStore';

export const ProjectContainer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {user} = useAuthStore();

  const genParam = searchParams.get('gen'); // null이면 전체
  const actParam = searchParams.get('act'); // null이면 전체
  const isAdmin = user?.isAdmin === true;

  const {data: generations = [], isLoading} = useGenerationQuery();

  const sortedGenerations = useMemo(() => {
    return [...generations].sort((a, b) => b.generationId - a.generationId);
  }, [generations]);

  const selectedGenLabel = genParam ? `${genParam}기` : '전체';
  const selectedActLabel = actParam ? ACTIVITY_MAP[actParam] || '전체' : '전체';
  const activityLabels = useMemo(() => {
    return ['전체', ...Object.values(ACTIVITY_MAP)];
  }, []);

  const genOptions = useMemo(() => {
    return ['전체', ...sortedGenerations.map((g) => `${g.generationId}기`)];
  }, [sortedGenerations]);

  const updateQuery = useCallback(
    (key: 'gen' | 'act', value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === 'all') {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      params.set('page', '1');
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router]
  );

  const handleActSelect = useCallback(
    (label: string) => {
      if (label === '전체') {
        updateQuery('act', 'all');
        return;
      }

      const actKey = Object.keys(ACTIVITY_MAP).find(
        (key) => ACTIVITY_MAP[key] === label
      );

      if (actKey) {
        updateQuery('act', actKey);
      }
    },
    [updateQuery]
  );

  if (isLoading) {
    return (
      <div
        className='flex min-h-100 items-center justify-center'
        aria-live='polite'
        aria-busy='true'>
        <Spinner />
      </div>
    );
  }

  return (
    <section
      className='flex w-full flex-col gap-6 px-6 py-10 lg:gap-7.5 lg:py-7.5'
      aria-labelledby='project-list-title'>
      <h2 id='project-list-title' className='sr-only'>
        프로젝트 목록 및 필터
      </h2>
      <div className='flex w-full flex-col items-center gap-7.5 lg:flex-row lg:justify-between'>
        <div
          className='flex w-full gap-6 lg:w-auto lg:px-6'
          role='group'
          aria-label='프로젝트 필터링'>
          <Dropdown
            placeholder='기수'
            className='flex-1 lg:flex-none'
            value={selectedGenLabel}
            options={genOptions}
            onSelect={(label) => {
              const gen = label === '전체' ? 'all' : label.replace('기', '');
              updateQuery('gen', gen);
            }}
            isBorder
          />
          <Dropdown
            placeholder='활동'
            className='flex-1 lg:flex-none'
            value={selectedActLabel}
            options={activityLabels}
            onSelect={handleActSelect}
            isBorder
          />
        </div>
        {isAdmin && (
          <div className='w-full lg:w-auto'>
            <Button
              label='추가하기'
              labelTypo='body_l_sb'
              width='100%'
              height={40}
              className='w-full lg:w-31.75'
              onClick={() => router.push(ROUTES.ADD_PROJECT())}
            />
          </div>
        )}
      </div>
      <ProjectSection
        generation={genParam ?? undefined}
        activity={actParam ?? undefined}
      />
    </section>
  );
};
